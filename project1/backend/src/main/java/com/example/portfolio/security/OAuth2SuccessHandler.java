package com.example.portfolio.security;

import com.example.portfolio.entity.Role;
import com.example.portfolio.entity.User;
import com.example.portfolio.repository.UserRepository;
import com.example.portfolio.util.JwtTokenProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                       Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String oauthId = oAuth2User.getAttribute("id");
        String provider = "google"; // or get dynamically

        // Check if user exists
        Optional<User> existingUser = userRepository.findByEmail(email);
        User user;

        if (existingUser.isPresent()) {
            user = existingUser.get();
            user.setUpdatedAt(System.currentTimeMillis());
            user = userRepository.save(user);
        } else {
            // Create new user
            // Assign ROLE_ADMIN if email matches admin email, else ROLE_USER
            Role role = "admin@gmail.com".equals(email) ? Role.ROLE_ADMIN : Role.ROLE_USER;
            user = new User(email, name, role, oauthId, provider);
            user = userRepository.save(user);
        }

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().toString());

        // Redirect to frontend with token
        String redirectUrl = String.format("http://localhost:5173/oauth/callback?token=%s&user=%s&role=%s",
                token, user.getEmail(), user.getRole().toString());

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}