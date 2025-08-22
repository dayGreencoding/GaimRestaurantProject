package com.gaigrill.restaurantbackend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@Component
@ConfigurationProperties(prefix = "jira")
public class JiraTokenConfig {
    /**
     * Binds keys like:
     * jira.tokens[daygreensummit@gmail.com]=TOKEN
     */
    private Map<String, String> tokens = new HashMap<>();

    public Map<String, String> getTokens() { return tokens; }
    public void setTokens(Map<String, String> tokens) { this.tokens = tokens; }

    public String tokenForEmail(String email) {
        if (email == null) return null;
        return tokens.get(email.trim().toLowerCase(Locale.ROOT));
    }
}
