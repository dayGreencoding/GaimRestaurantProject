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
                        // static files
                        .requestMatchers(
                                "/", "/index.html",
                                "/login.html",
                                "/admin-dashboard.html",
                                "/employee-dashboard.html",
                                "/css/**", "/js/**", "/images/**"
                        ).permitAll()

                        // DEV: allow dashboard APIs so the page can fetch data
                        .requestMatchers("/api/dashboard/**").permitAll()

                        // keep auth on everything else
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults()); // fine for now
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance(); // only if DB passwords are plain text
    }
}
