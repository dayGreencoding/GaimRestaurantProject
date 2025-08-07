package com.gaigrill.restaurantbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class RestaurantBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(RestaurantBackendApplication.class, args);
    }
}
