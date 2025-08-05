package com.gaigrill.restaurantbackend.service;
import com.gaigrill.restaurantbackend.model.User;
import com.gaigrill.restaurantbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<com.gaigrill.restaurantbackend.model.User> login(String username, String password) {
        Optional<User> users = userRepository.findByUsername(username);
        return users.filter(u -> {
            return u.getPassword().equals(password);
        });

        }
    }

