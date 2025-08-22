
package com.gaigrill.restaurantbackend.controller;

import com.gaigrill.restaurantbackend.config.JiraProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final JiraProperties props;
    private final RestTemplate rest;

    @GetMapping("/hours")
    public Map<String, Object> hours(
            @RequestParam String employeeId,
            @RequestParam String from,      // YYYY-MM-DD
            @RequestParam String to         // YYYY-MM-DD
    ) {
        // validate
        if (isBlank(employeeId) || isBlank(from) || isBlank(to)) {
            return Map.of("error", "employeeId, from, to are required");
        }
        LocalDate fromDate = LocalDate.parse(from);
        LocalDate toDate   = LocalDate.parse(to);

        // build auth with service fallback (read-only OK)
        var creds = props.credsFor(null);
        if (creds == null) {
            return Map.of("error", "No Jira service credentials configured.");
        }
        HttpHeaders headers = authHeaders(creds.email(), creds.token());

        // JQL: find clock-in issues for this employeeId and date window
        // (created is the clock-in time, since we create issue on login)
        String jql = String.format(
                "project = %s AND labels in (attendance, \"clock-in\") " +
                        "AND created >= \"%s\" AND created <= \"%s\" " +
                        "AND summary ~ \"%s\"",
                props.getProjectKey(), fromDate, toDate.plusDays(1), escape(employeeId)
        );
        if (props.getClockinComponent() != null && !props.getClockinComponent().isBlank()) {
            jql += " AND component = \"" + escape(props.getClockinComponent()) + "\"";
        }

        // search issues
        Map<String,Object> searchBody = Map.of(
                "jql", jql,
                "fields", List.of("key"),
                "maxResults", 1000
        );
        String searchUrl = props.getBase() + "/rest/api/3/search";
        var searchResp = rest.postForEntity(searchUrl, new HttpEntity<>(searchBody, headers), Map.class);
        var searchObj  = searchResp.getBody();

        long totalSeconds = 0;
        List<Map<String,Object>> entries = new ArrayList<>();

        if (searchObj != null) {
            @SuppressWarnings("unchecked")
            List<Map<String,Object>> issues = (List<Map<String,Object>>) searchObj.get("issues");
            if (issues != null) {
                for (var issue : issues) {
                    String key = String.valueOf(issue.get("key"));
                    if (key == null) continue;

                    // list worklogs on this issue
                    String wlUrl = props.getBase() + "/rest/api/3/issue/" + key + "/worklog?startAt=0&maxResults=1000";
                    try {
                        var wlResp = rest.exchange(wlUrl, HttpMethod.GET, new HttpEntity<Void>(headers), Map.class);
                        @SuppressWarnings("unchecked")
                        List<Map<String,Object>> logs = (List<Map<String,Object>>) wlResp.getBody().get("worklogs");
                        if (logs == null) continue;

                        long issueSeconds = 0;
                        for (var wl : logs) {
                            Object secsObj = wl.get("timeSpentSeconds");
                            if (secsObj == null) continue;
                            long s = Long.parseLong(String.valueOf(secsObj));
                            issueSeconds += s;
                            totalSeconds += s;
                        }
                        entries.add(Map.of(
                                "issueKey", key,
                                "workedSeconds", issueSeconds,
                                "workedHHMM", toHHMM(issueSeconds)
                        ));
                    } catch (Exception ex) {
                        // skip this issue if worklog fetch fails
                    }
                }
            }
        }

        return Map.of(
                "employeeId", employeeId,
                "from", fromDate.toString(),
                "to", toDate.toString(),
                "totalSeconds", totalSeconds,
                "totalHHMM", toHHMM(totalSeconds),
                "entries", entries
        );
    }

    private static String toHHMM(long seconds) {
        long h = seconds / 3600;
        long m = (seconds % 3600) / 60;
        return h + ":" + String.format("%02d", m);
    }

    private static String escape(String s) {
        return s.replace("\"", "\\\"");
    }

    private static boolean isBlank(String s){ return s == null || s.isBlank(); }

    private static HttpHeaders authHeaders(String email, String token) {
        String auth = "Basic " + Base64.getEncoder().encodeToString(
                (email + ":" + token).getBytes(StandardCharsets.UTF_8));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
        headers.set("Authorization", auth);
        return headers;
    }
}
