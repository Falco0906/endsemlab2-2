package com.example.portfolio.controller;

import com.example.portfolio.entity.User;
import com.example.portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    /**
     * Get all users (Admin only)
     */
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Get user by email (Admin only)
     */
    @GetMapping("/users/{email}")
    public Optional<User> getUserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Delete user (Admin only)
     */
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

    /**
     * Get admin dashboard info
     */
    @GetMapping("/dashboard")
    public AdminDashboard getDashboard() {
        long totalUsers = userRepository.count();
        return new AdminDashboard(totalUsers, "Admin Dashboard");
    }

    /**
     * Inner class for dashboard response
     */
    public static class AdminDashboard {
        public long totalUsers;
        public String message;

        public AdminDashboard(long totalUsers, String message) {
            this.totalUsers = totalUsers;
            this.message = message;
        }

        public long getTotalUsers() {
            return totalUsers;
        }

        public String getMessage() {
            return message;
        }
    }
}