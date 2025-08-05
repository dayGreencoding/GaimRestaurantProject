package com.gaigrill.restaurantbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/dashboard.html",        // ✅ allow dashboard page without login
                                "/api/dashboard/**",      // ✅ allow all dashboard-related APIs
                                "/css/**", "/js/**", "/images/**", "/static/**"  // ✅ static resources
                        ).permitAll()
                        .anyRequest().authenticated() // 🔐 secure everything else
                )
                .httpBasic(AbstractHttpConfigurer::disable); // enable basic auth for secured endpoints

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance(); // ⚠️ Only for development/testing
    }
}
