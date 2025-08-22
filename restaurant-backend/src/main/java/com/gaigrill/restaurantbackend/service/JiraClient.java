package com.gaigrill.restaurantbackend.service;

import com.gaigrill.restaurantbackend.config.JiraProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
@RequiredArgsConstructor
public class JiraClient {

    private final JiraProperties jiraProperties;

    /** Verifies a token exists for this email (no remote call). */
    public boolean loginToJira(String email) {
        if (email == null) return false;
        String key = email.trim().toLowerCase(Locale.ROOT);
        String token = jiraProperties.tokenFor(key);
        if (token == null || token.isBlank()) {
            System.err.println("No Jira API token configured for email: " + key);
            return false;
        }
        return true;
    }
}
