package com.gaigrill.restaurantbackend.controller;

import com.gaigrill.restaurantbackend.model.JiraEmployee;
import com.gaigrill.restaurantbackend.repository.JiraEmployeeRepository;
import com.gaigrill.restaurantbackend.service.JiraService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JiraEmployeeRepository employees;
    private final PasswordEncoder encoder;
    private final JiraService jiraService;

    @PostMapping(value="/login", consumes="application/json", produces="application/json")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body, HttpSession session) {
        String employeeId = trim(body.get("employeeId"));
        String passcode   = trim(body.get("passcode"));

        if (!StringUtils.hasText(employeeId) || !StringUtils.hasText(passcode)) {
            return ResponseEntity.badRequest().body(Map.of("error", "employeeId & passcode required"));
        }

        JiraEmployee je = employees.findByEmployeeId(employeeId).orElse(null);
        if (je == null || je.getPasscodeHash() == null || !encoder.matches(passcode, je.getPasscodeHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }

        // ✅ Non-blocking Jira clock-in (do NOT return 500 on failure)
        try {
            jiraService.clockIn(je.getEmail(), je.getEmployeeId(), je.getName(), session);
        } catch (Exception ignore) { /* never block login */ }

        session.setAttribute("employeeId", je.getEmployeeId());
        session.setAttribute("employeeName", je.getName());
        session.setAttribute("department", deptFromId(je.getEmployeeId()));

        String redirect = je.getEmployeeId().startsWith("ADMIN")
                ? "/admin-dashboard.html"
                : "/employee-dashboard.html";

        return ResponseEntity.ok(Map.of(
                "redirect", redirect,
                "employeeId", je.getEmployeeId(),
                "name", je.getName(),
                "email", je.getEmail(),
                "department", deptFromId(je.getEmployeeId())
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        jiraService.clockOut(session);
        session.invalidate();
        return ResponseEntity.ok(Map.of("ok", true));
    }

    private static String trim(String s) { return s == null ? null : s.trim(); }
    private static String deptFromId(String id) {
        if (id == null) return "Managers";
        if (id.startsWith("ADMIN")) return "Admin";
        if (id.startsWith("MGR"))   return "Managers";
        if (id.startsWith("CHEF"))  return "Chef/Kitchen";
        if (id.startsWith("FRNT"))  return "Front Desk";
        return "Managers";
    }
}
