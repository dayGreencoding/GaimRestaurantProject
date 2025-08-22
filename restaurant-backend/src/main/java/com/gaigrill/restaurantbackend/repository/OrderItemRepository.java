package com.gaigrill.restaurantbackend.repository;

import com.gaigrill.restaurantbackend.model.OrderItem;
import org.springframework.data.repository.CrudRepository;

public interface OrderItemRepository extends CrudRepository<OrderItem, Long> {
}
