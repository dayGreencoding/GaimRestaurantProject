package com.gaigrill.restaurantbackend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private int orderItemId;
    @Column(name = "order_id")
    private int orderId;
    @Column(name = "item_id")
    private int itemId;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "unit_price")
    private double unitPrice;

    @ManyToOne
    @ToString.Exclude
    @JoinColumn(name = "order")
    private Order order;

}
