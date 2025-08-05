package com.gaigrill.restaurantbackend.controller;

import com.gaigrill.restaurantbackend.model.User;
import com.gaigrill.restaurantbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginUser) {
        Optional<User> userOpt = userService.login(loginUser.getUsername(), loginUser.getPassword());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getRole().equalsIgnoreCase("admin")) {
                return ResponseEntity.ok("/admin-dashboard.html");
            } else if (user.getRole().equalsIgnoreCase("employee")) {
                return ResponseEntity.ok("/employee-dashboard.html");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
