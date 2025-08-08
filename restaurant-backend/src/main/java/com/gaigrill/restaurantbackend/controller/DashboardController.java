package com.gaigrill.restaurantbackend.controller;

import com.gaigrill.restaurantbackend.model.Employee;
import com.gaigrill.restaurantbackend.model.Order;
import com.gaigrill.restaurantbackend.model.MenuItem;
import com.gaigrill.restaurantbackend.repository.EmployeeRepository;
import com.gaigrill.restaurantbackend.repository.OrderRepository;
import com.gaigrill.restaurantbackend.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private OrderRepository orderRepository;
    @Autowired private MenuItemRepository menuItemRepository;

    // ===== Employees =====
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @GetMapping("/admins")
    public List<Employee> getAdmins() {
        List<Employee> admins = employeeRepository.findByDepartment("Admin");
        return admins.size() > 2 ? admins.subList(0, 2) : admins;
    }

    @GetMapping("/chefs")
    public List<Employee> getChefs() {
        List<Employee> chefs = employeeRepository.findByDepartment("Chef/Kitchen");
        return chefs.size() > 2 ? chefs.subList(0, 2) : chefs;
    }

    @GetMapping("/managers")
    public List<Employee> getManagers() {
        List<Employee> managers = employeeRepository.findByDepartment("Manager");
        return managers.size() > 2 ? managers.subList(0, 2) : managers;
    }

    @GetMapping("/frontdesk")
    public List<Employee> getFrontDesk() {
        List<Employee> frontDesk = employeeRepository.findByDepartment("Front Desk");
        return frontDesk.size() > 2 ? frontDesk.subList(0, 2) : frontDesk;
    }

    // ===== Menu =====
    @GetMapping("/menu")
    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    // ===== Orders =====
    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Update order status (used by dashboard)
    @PutMapping("/orders/{id}/status")
    public ResponseEntity<Void> updateOrderStatus(@PathVariable Long id, @RequestParam String value) {
        Order o = orderRepository.findById(id).orElse(null);
        if (o == null) return ResponseEntity.notFound().build();
        o.setStatus(value);
        orderRepository.save(o);
        return ResponseEntity.ok().build();
    }

    // ===== Simple admin passcode login (optional) =====
    @PostMapping("/admin-login")
    public ResponseEntity<String> adminLogin(@RequestParam String userId, @RequestParam String passcode) {
        Optional<Employee> user = employeeRepository.findByEmployeeId(userId);
        if (user.isPresent() && "adminpass".equals(passcode)) {
            return ResponseEntity.ok("Login Successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
    }
}
