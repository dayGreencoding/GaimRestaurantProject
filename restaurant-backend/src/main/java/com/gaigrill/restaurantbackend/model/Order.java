package com.gaigrill.restaurantbackend.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@Table(name = "orders") // NOT "order" (reserved)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @Column(name = "customer_id")
    private String customerId;

    @Column(name = "order_date")
    private LocalDateTime orderDate;
    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy = "order")
        private Set <OrderItem> orderItems= new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "customer")
    private Customer customer;

}
