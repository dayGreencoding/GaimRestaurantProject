package com.gaigrill.restaurantbackend.repository;
import com.gaigrill.restaurantbackend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
