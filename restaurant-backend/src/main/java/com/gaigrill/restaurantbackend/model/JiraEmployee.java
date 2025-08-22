
package com.gaigrill.restaurantbackend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Jira_Employee")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class JiraEmployee {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable=false, length=100)
    private String name;

    @Column(name="employee_id", nullable=false, unique=true, length=32)
    private String employeeId;

    @Column(nullable=false, unique=true, length=120)
    private String email;

    // TEMP: present in your table now for migration
    @Column(length=128)
    private String passcode;

    // TARGET: store only the hash here
    @Column(name="passcode_hash", length=100)
    private String passcodeHash;
}
