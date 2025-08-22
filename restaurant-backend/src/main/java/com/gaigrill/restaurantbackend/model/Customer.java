package com.gaigrill.restaurantbackend.model;
import java.util.*;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.*;
@Setter
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private int customerId;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "email")
    private String email;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "address")
    private String address;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "Order")
    private Set<Order> orders = new HashSet<>();

}
