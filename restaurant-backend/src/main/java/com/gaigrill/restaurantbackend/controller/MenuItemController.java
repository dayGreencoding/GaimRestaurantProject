// src/main/java/com/gai/grill/restaurantbackend/controller/MenuItemController.java
package com.gaigrill.restaurantbackend.controller;

import com.gaigrill.restaurantbackend.repository.MenuItemRepository;
import com.gaigrill.restaurantbackend.model.MenuItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:5173") // frontend port
public class MenuItemController {

    @Autowired
    private MenuItemRepository repository;

    @GetMapping
    public List<MenuItem> getAllMenuItems() {
        return repository.findAll();
    }
}
