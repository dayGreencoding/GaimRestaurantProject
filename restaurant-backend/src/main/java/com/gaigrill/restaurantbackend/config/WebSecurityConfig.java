package com.gaigrill.restaurantbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
                                "/", "/index.html",
                                "/login.html",
                                "/admin-dashboard.html",
                                "/dashboard.html",
                                "/employee-dashboard.html",
                                "/css/**", "/js/**", "/images/**",
                                "/api/menu",
                                "/api/debug/**",
                                "/api/auth/login",
                                "/api/auth/logout",
                                "/api/time/clock-in", "/api/time/clock-out", "/api/admin/create-shift",
                                "/api/dashboard/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(AbstractHttpConfigurer::disable)  // disable Spring’s form login
                .httpBasic(AbstractHttpConfigurer::disable); // disable HTTP Basic popup

        return http.build();
    }
        @Bean
        public PasswordEncoder passwordEncoder () {
            return new BCryptPasswordEncoder();
        }
    }
