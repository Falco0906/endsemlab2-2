package com.example.portfolio.repository;

import com.example.portfolio.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByOauthId(String oauthId);
    Optional<User> findByEmailAndOauthProvider(String email, String oauthProvider);
}