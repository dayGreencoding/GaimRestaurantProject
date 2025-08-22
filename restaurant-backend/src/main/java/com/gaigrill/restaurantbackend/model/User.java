package com.gaigrill.restaurantbackend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Used everywhere in your time tracking flow */
    @Column(nullable = false, unique = true, length = 64)
    private String employeeId;

    /** Human-friendly display name */
    @Column(nullable = false, length = 120)
    private String name;

    /** For Spring Security username/password login flows (AuthController, CustomUserDetailsService) */
    @Column(unique = true, length = 120)
    private String username;

    /** Store a hash in production; plain here to satisfy existing references */
    @Column(length = 255)
    private String password;

    /** For kiosk/passcode login (TimeController expects getPasscode()) */
    @Column(length = 20)
    private String passcode;

    @Column(length = 80)
    private String department;

    @Column(length = 80)
    private String role;

    @Column(length = 120)
    private String email;

    @Column(length = 40)
    private String phone;

    @Column(length = 200)
    private String address;
}
