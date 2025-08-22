package com.gaigrill.restaurantbackend.config;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@Component
@ConfigurationProperties(prefix = "jira")
public class JiraProperties {
    private String base;
    private String projectKey;

    // Fallback service account (used when user token not available)
    private String apiEmail;
    private String apiToken;

    // Optional: put all clock-in issues under this component
    private String clockinComponent;

    // Optional per-user tokens: jira.tokens[email]=token
    private Map<String,String> tokens = new HashMap<>();

    public String getBase() { return base; }
    public void setBase(String base) { this.base = base; }
    public String getProjectKey() { return projectKey; }
    public void setProjectKey(String projectKey) { this.projectKey = projectKey; }

    public String getApiEmail() { return apiEmail; }
    public void setApiEmail(String apiEmail) { this.apiEmail = apiEmail; }
    public String getApiToken() { return apiToken; }
    public void setApiToken(String apiToken) { this.apiToken = apiToken; }

    public String getClockinComponent() { return clockinComponent; }
    public void setClockinComponent(String clockinComponent) { this.clockinComponent = clockinComponent; }

    public Map<String, String> getTokens() { return tokens; }
    public void setTokens(Map<String, String> tokens) { this.tokens = tokens; }

    public String tokenFor(String email) {
        if (email == null) return null;
        return tokens.get(email.trim().toLowerCase(Locale.ROOT));
    }

    /** Pick per-user token if available, else service fallback. */
    public Creds credsFor(String email) {
        String e = email == null ? null : email.trim().toLowerCase(Locale.ROOT);
        String userTok = e == null ? null : tokens.get(e);
        if (userTok != null && !userTok.isBlank()) {
            return new Creds(e, userTok);
        }
        if (apiEmail != null && !apiEmail.isBlank() && apiToken != null && !apiToken.isBlank()) {
            return new Creds(apiEmail.trim().toLowerCase(Locale.ROOT), apiToken);
        }
        return null;
    }

    public record Creds(String email, String token) {}

    @PostConstruct
    void debug() {
        System.out.println("[JiraProperties] project=" + projectKey +
                ", svc=" + apiEmail +
                ", hasSvcToken=" + (apiToken != null && !apiToken.isBlank()) +
                ", userTokens=" + tokens.keySet());
    }
}
