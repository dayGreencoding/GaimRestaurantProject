package com.gaigrill.restaurantbackend.repository;

import com.gaigrill.restaurantbackend.model.JiraEmployee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface JiraEmployeeRepository extends JpaRepository<JiraEmployee, Integer> {
    Optional<JiraEmployee> findByEmployeeId(String employeeId);
}
