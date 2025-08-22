package com.gaigrill.restaurantbackend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class DeptCredsResolver {
    @Value("${jira.admin.email}")     private String adminEmail;
    @Value("${jira.admin.api.token}") private String adminToken;
    @Value("${jira.manager.email}")     private String mgrEmail;
    @Value("${jira.manager.api.token}") private String mgrToken;
    @Value("${jira.chef.email}")     private String chefEmail;
    @Value("${jira.chef.api.token}") private String chefToken;
    @Value("${jira.frontdesk.email}")     private String fdEmail;
    @Value("${jira.frontdesk.api.token}") private String fdToken;

    public record Creds(String email, String token) {}
    public Creds admin() { return new Creds(adminEmail, adminToken); }

    public Creds byDept(String dept) {
        if (dept == null) return admin();
        switch (dept.trim().toLowerCase()) {
            case "admin", "management": return new Creds(adminEmail, adminToken);
            case "managers", "manager": return new Creds(mgrEmail, mgrToken);
            case "chef/kitchen", "kitchen", "chef": return new Creds(chefEmail, chefToken);
            case "front desk", "frontdesk", "front_desk": return new Creds(fdEmail, fdToken);
            default: return admin();
        }
    }
}
