package com.gaigrill.restaurantbackend.repository;

import com.gaigrill.restaurantbackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    // Find employees by department
    List<Employee> findByDepartment(String department);
}
