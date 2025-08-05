package com.gaigrill.restaurantbackend.controller;
import com.gaigrill.restaurantbackend.model.Employee;
import com.gaigrill.restaurantbackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DashboardController {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Get 2 admins
    @GetMapping("/api/dashboard/admins")
    public List<Employee> getAdmins() {
        List<Employee> admins = employeeRepository.findByDepartment("Admin");
        return admins.size() > 2 ? admins.subList(0, 2) : admins; // return first 2 admins
    }

    // Get 2 chefs
    @GetMapping("/api/dashboard/chefs")
    public List<Employee> getChefs() {
        List<Employee> chefs = employeeRepository.findByDepartment("Chef/Kitchen");
        return chefs.size() > 2 ? chefs.subList(0, 2) : chefs; // return first 2 chefs
    }

    // Get 2 managers
    @GetMapping("/api/dashboard/managers")
    public List<Employee> getManagers() {
        List<Employee> managers = employeeRepository.findByDepartment("Manager");
        return managers.size() > 2 ? managers.subList(0, 2) : managers; // return first 2 managers
    }

    // Get 2 front desk staff
    @GetMapping("/api/dashboard/frontdesk")
    public List<Employee> getFrontDesk() {
        List<Employee> frontDesk = employeeRepository.findByDepartment("Front Desk");
        return frontDesk.size() > 2 ? frontDesk.subList(0, 2) : frontDesk; // return first 2 front desk staff
    }

    // Pre-populate login page with ID (this is an example, modify as needed)
    @GetMapping("/api/login/{id}")
    public String loginPage(@PathVariable String id) {
        // You can return an HTML or redirect the user to the login page with pre-populated ID
        return "<html><body><h1>Hi Admin, Your ID is: " + id + "</h1><form action='/admin/dashboard' method='post'><label for='password'>Password:</label><input type='password' id='password' name='password' required><input type='submit' value='Login'></form></body></html>";
    }
}