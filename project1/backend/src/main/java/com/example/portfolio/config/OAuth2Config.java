package com.example.portfolio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@Configuration
public class OAuth2Config {

    @Bean
    public DefaultOAuth2UserService oAuth2UserService() {
        return new DefaultOAuth2UserService() {
            @Override
            public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
                OAuth2User oAuth2User = super.loadUser(userRequest);
                String email = oAuth2User.getAttribute("email");
                List<SimpleGrantedAuthority> authorities = getAuthorities(email);
                return new DefaultOAuth2User(authorities, oAuth2User.getAttributes(), "id");
            }
        };
    }

    private List<SimpleGrantedAuthority> getAuthorities(String email) {
        // Hardcode admin emails for demo
        Set<String> adminEmails = Set.of("admin@example.com"); // Replace with actual admin emails
        if (adminEmails.contains(email)) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
        } else {
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }
}