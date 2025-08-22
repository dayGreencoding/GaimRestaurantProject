package com.gaigrill.restaurantbackend.debug;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.gaigrill.restaurantbackend.model.JiraEmployee;
import com.gaigrill.restaurantbackend.repository.JiraEmployeeRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/debug")
@RequiredArgsConstructor
public class DebugController {

    private final JiraEmployeeRepository repo;
    private final PasswordEncoder encoder;

    @GetMapping("/ping")
    public Map<String, String> ping() {
        return Map.of("ok", "true");
    }

    @GetMapping("/employee/{id}")
    public Map<String, Object> employee(@PathVariable String id) {
        JiraEmployee e = repo.findByEmployeeId(id.trim().toUpperCase())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "no employee"));
        String hash = e.getPasscodeHash();
        return Map.of(
                "employeeId", e.getEmployeeId(),
                "name", e.getName(),
                "hasHash", hash != null,
                "hashPrefix", hash == null ? null : hash.substring(0, Math.min(4, hash.length())),
                "hashLen", hash == null ? 0 : hash.length()
        );
    }

    public record LoginProbe(String employeeId, String passcode) {}

    @PostMapping("/login-probe")
    public Map<String, Object> loginProbe(@RequestBody LoginProbe body) {
        JiraEmployee e = repo.findByEmployeeId(body.employeeId().trim().toUpperCase())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "bad id"));
        boolean matches = encoder.matches(body.passcode(), e.getPasscodeHash());
        return Map.of(
                "id", e.getEmployeeId(),
                "name", e.getName(),
                "matches", matches
        );
    }
}
