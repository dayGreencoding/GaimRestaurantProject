package com.gaigrill.restaurantbackend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;

@Entity @Table(name = "work_session")
@Getter @Setter @NoArgsConstructor
public class WorkSession {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 64)
    private String employeeId;

    @Column(length = 80)
    private String department;

    @Column(nullable = false, columnDefinition = "timestamp")
    private OffsetDateTime startedAt;

    @Column(columnDefinition = "timestamp")
    private OffsetDateTime endedAt;

    @Column(length = 32)
    private String jiraIssueKey;

    public WorkSession(String employeeId, String department, OffsetDateTime startedAt, String jiraIssueKey) {
        this.employeeId = employeeId;
        this.department = department;
        this.startedAt = startedAt;
        this.jiraIssueKey = jiraIssueKey;
    }
}
