package com.gaigrill.restaurantbackend.controller;

import com.gaigrill.restaurantbackend.model.Employee;
import com.gaigrill.restaurantbackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*") // Allows frontend to access the API (optional if same origin)
public class DashboardController {

    @Autowired
    private EmployeeRepository employeeRepository;

    // ✅ All Employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // ✅ 2 Admins
    @GetMapping("/admins")
    public List<Employee> getAdmins() {
        List<Employee> admins = employeeRepository.findByDepartment("Admin");
        return admins.size() > 2 ? admins.subList(0, 2) : admins;
    }

    // ✅ 2 Chefs
    @GetMapping("/chefs")
    public List<Employee> getChefs() {
        List<Employee> chefs = employeeRepository.findByDepartment("Chef/Kitchen");
        return chefs.size() > 2 ? chefs.subList(0, 2) : chefs;
    }

    // ✅ 2 Managers
    @GetMapping("/managers")
    public List<Employee> getManagers() {
        List<Employee> managers = employeeRepository.findByDepartment("Manager");
        return managers.size() > 2 ? managers.subList(0, 2) : managers;
    }

    // ✅ 2 Front Desk Staff
    @GetMapping("/frontdesk")
    public List<Employee> getFrontDesk() {
        List<Employee> frontDesk = employeeRepository.findByDepartment("Front Desk");
        return frontDesk.size() > 2 ? frontDesk.subList(0, 2) : frontDesk;
    }

    // ✅ Login Verification (simple passcode logic)
    @PostMapping("/admin-login")
    public ResponseEntity<String> adminLogin(@RequestParam String userId, @RequestParam String passcode) {
        Optional<Employee> user = employeeRepository.findByEmployeeId(userId);
        if (user.isPresent() && passcode.equals("adminpass")) {
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        }
    }
}
