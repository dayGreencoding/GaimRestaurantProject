package com.gaigrill.restaurantbackend.repository;

import com.gaigrill.restaurantbackend.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemRepository extends JpaRepository<MenuItem, Integer> {
}
