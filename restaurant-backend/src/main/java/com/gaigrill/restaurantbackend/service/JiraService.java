package com.gaigrill.restaurantbackend.service;

import com.gaigrill.restaurantbackend.config.JiraProperties;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class JiraService {

    private final JiraProperties props;
    private final RestTemplate rest; // from your JiraConfig

    private static final DateTimeFormatter JIRA_TS =
            DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ");

    /** LOGIN: create a Clock-in issue and remember the key & start time in the session. */
    public boolean clockIn(String email, String employeeId, String name, HttpSession session) {
        try {
            String token = props.tokenFor(email);
            if (token == null || token.isBlank()) {
                System.err.println("[Jira] No API token for " + email + " — skipping clock-in");
                return true; // don't block login
            }

            String summary = String.format(
                    "Clock-in - %s (%s) at %s",
                    nvl(employeeId), nvl(name),
                    JIRA_TS.format(ZonedDateTime.now())
            );

            Map<String, Object> body = Map.of(
                    "fields", mergeMaps(
                            Map.of(
                                    "project", Map.of("key", props.getProjectKey()),
                                    "summary", summary,
                                    "issuetype", Map.of("name", "Task"),
                                    "labels", List.of("attendance", "clock-in")
                            ),
                            // If you want a component, uncomment below and set it:
                            // Map.of("components", List.of(Map.of("name", "Schedule")))
                            Map.of()
                    )
            );

            ResponseEntity<Map> resp = rest.postForEntity(
                    props.getBase() + "/rest/api/3/issue",
                    new HttpEntity<>(body, authHeaders(email, token)),
                    Map.class
            );

            String key = resp.getBody() != null ? Objects.toString(resp.getBody().get("key"), null) : null;
            if (key == null) {
                System.err.println("[Jira] Clock-in created but no key returned; response=" + resp);
                return true;
            }

            // remember for logout
            session.setAttribute("jiraUserEmail", email);
            session.setAttribute("clockInIssueKey", key);
            session.setAttribute("clockInAtMs", System.currentTimeMillis());
            session.setAttribute("clockInEmpId", nvl(employeeId));

            System.out.println("[Jira] Clock-in issue created: " + key + " (auth=" + email + ")");
        } catch (RestClientResponseException ex) {
            System.err.println("[Jira] Clock-in failed: " + ex.getRawStatusCode() + " " + ex.getStatusText());
            System.err.println("[Jira] Response: " + ex.getResponseBodyAsString());
        } catch (Exception e) {
            System.err.println("[Jira] Clock-in failed: " + e.getMessage());
        }
        return true; // never block login
    }

    /** Overload kept for backward compatibility. */
    public boolean clockIn(String email, String name, HttpSession session) {
        return clockIn(email, null, name, session);
    }

    /** LOGOUT: add a worklog on the same issue; optionally transition to Done. */

    public void clockOut(HttpSession session) {
        String key   = (String) session.getAttribute("clockInIssueKey");
        Long   at    = (Long)   session.getAttribute("clockInAtMs");
        String emp   = (String) session.getAttribute("clockInEmpId");
        String email = (String) session.getAttribute("jiraUserEmail");

        // Clear session regardless
        session.removeAttribute("clockInIssueKey");
        session.removeAttribute("clockInAtMs");
        session.removeAttribute("clockInEmpId");
        session.removeAttribute("jiraClockIn");
        session.removeAttribute("jiraUserEmail");
        session.removeAttribute("jiraUserName");

        if (key == null || at == null || email == null) {
            System.out.println("[Jira] Clock-out skipped (missing key/start/email in session).");
            return;
        }

        String token = props.tokenFor(email);
        if (token == null || token.isBlank()) {
            System.err.println("[Jira] Clock-out skipped: no token for " + email);
            return;
        }

        try {
            long end  = System.currentTimeMillis();
            long secs = Math.max(1, (end - at) / 1000);

            ZonedDateTime started = ZonedDateTime.ofInstant(Instant.ofEpochMilli(at), ZoneId.systemDefault());
            String startedStr = JIRA_TS.format(started); // e.g. 2025-08-19T23:12:42.183-0400

            // --- ADF comment (required for Jira Cloud v3) ---
            String text = "Auto worklog" + (emp != null ? " [" + emp + "]" : "");
            Map<String, Object> adfComment = Map.of(
                    "type", "doc",
                    "version", 1,
                    "content", List.of(Map.of(
                            "type", "paragraph",
                            "content", List.of(Map.of(
                                    "type", "text",
                                    "text", text
                            ))
                    ))
            );

            Map<String, Object> worklogBody = new HashMap<>();
            worklogBody.put("started", startedStr);
            worklogBody.put("timeSpentSeconds", secs);
            worklogBody.put("comment", adfComment);   // <-- ADF, not a plain string

            HttpHeaders headers = authHeaders(email, token);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));

            String url = props.getBase() + "/rest/api/3/issue/" + key + "/worklog";

            // First try with ADF comment
            try {
                rest.postForEntity(url, new HttpEntity<>(worklogBody, headers), Map.class);
            } catch (RestClientResponseException ex) {
                // Some instances are fussy about comment; retry WITHOUT comment (minimal body)
                if (ex.getRawStatusCode() == 400) {
                    Map<String, Object> minimal = Map.of(
                            "started", startedStr,
                            "timeSpentSeconds", secs
                    );
                    rest.postForEntity(url, new HttpEntity<>(minimal, headers), Map.class);
                } else {
                    throw ex;
                }
            }

            System.out.println("[Jira] Worklog added to " + key + " for " + (secs / 60) + " min");

            // Optional: transition to Done
            tryTransitionToDone(key, email, token);

        } catch (RestClientResponseException ex) {
            System.err.println("[Jira] Worklog failed: " + ex.getRawStatusCode() + " " + ex.getStatusText());
            System.err.println("[Jira] Response: " + ex.getResponseBodyAsString());
        } catch (Exception e) {
            System.err.println("[Jira] Worklog failed: " + e.getMessage());
        }
    }


    /* ---------- helpers ---------- */

    private HttpHeaders authHeaders(String email, String token) {
        String basic = email + ":" + token;
        String auth = "Basic " + Base64.getEncoder().encodeToString(basic.getBytes(StandardCharsets.UTF_8));
        HttpHeaders h = new HttpHeaders();
        h.setContentType(MediaType.APPLICATION_JSON);
        h.set("Authorization", auth);
        return h;
    }

    private static String nvl(String s) { return s == null ? "" : s; }

    private static Map<String, Object> mergeMaps(Map<String, Object> a, Map<String, Object> b) {
        Map<String, Object> m = new HashMap<>(a);
        m.putAll(b);
        return m;
    }

    /** best-effort: find a transition named "Done" (case-insensitive) and apply it */
    private void tryTransitionToDone(String key, String email, String token) {
        try {
            ResponseEntity<Map> tResp = rest.exchange(
                    props.getBase() + "/rest/api/3/issue/" + key + "/transitions",
                    HttpMethod.GET, new HttpEntity<>(authHeaders(email, token)), Map.class
            );
            Object arr = tResp.getBody() != null ? tResp.getBody().get("transitions") : null;
            if (!(arr instanceof List<?> list)) return;
            String doneId = null;
            for (Object o : list) {
                if (o instanceof Map<?,?> m) {
                    String name = Objects.toString(m.get("name"), "");
                    if ("done".equalsIgnoreCase(name)) {
                        doneId = Objects.toString(m.get("id"), null);
                        break;
                    }
                }
            }
            if (doneId == null) return;

            Map<String, Object> body = Map.of("transition", Map.of("id", doneId));
            rest.postForEntity(
                    props.getBase() + "/rest/api/3/issue/" + key + "/transitions",
                    new HttpEntity<>(body, authHeaders(email, token)),
                    Void.class
            );
            System.out.println("[Jira] Transitioned " + key + " → Done");
        } catch (Exception ignore) { /* non-fatal */ }
    }
}
