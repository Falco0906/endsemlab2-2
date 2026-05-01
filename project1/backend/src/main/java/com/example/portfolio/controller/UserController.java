package com.example.portfolio.controller;

import com.example.portfolio.entity.User;
import com.example.portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    /**
     * Get current user profile
     */
    @GetMapping("/profile")
    public Optional<User> getCurrentUserProfile(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email);
    }

    /**
     * Update current user profile
     */
    @PutMapping("/profile")
    public User updateUserProfile(@RequestBody User userDetails, Authentication authentication) {
        String email = authentication.getName();
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (userDetails.getName() != null) {
                user.setName(userDetails.getName());
            }
            user.setUpdatedAt(System.currentTimeMillis());
            return userRepository.save(user);
        }
        return null;
    }

    /**
     * Get user info
     */
    @GetMapping("/info")
    public UserInfo getUserInfo(Authentication authentication) {
        String email = authentication.getName();
        return new UserInfo(email, authentication.getAuthorities().toString());
    }

    /**
     * Inner class for user info
     */
    public static class UserInfo {
        public String email;
        public String roles;

        public UserInfo(String email, String roles) {
            this.email = email;
            this.roles = roles;
        }

        public String getEmail() {
            return email;
        }

        public String getRoles() {
            return roles;
        }
    }
}