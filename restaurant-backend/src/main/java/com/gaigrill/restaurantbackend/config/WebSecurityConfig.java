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
                                "/dashboard.html",         // ✅ Allow dashboard
                                "/api/dashboard/**",       // ✅ Allow dashboard API
                                "/api/menu/**",            // ✅ Allow menu API
                                "/css/**", "/js/**", "/images/**", "/static/**" // ✅ Static assets
                        ).permitAll()
                        .anyRequest().authenticated() // 🔒 Secure other requests
                )
                .httpBasic(Customizer.withDefaults()); // Basic auth enabled (optional)

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance(); // ⚠️ For development only
    }
}
