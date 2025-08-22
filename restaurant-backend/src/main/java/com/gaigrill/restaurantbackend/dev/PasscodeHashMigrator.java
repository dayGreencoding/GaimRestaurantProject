package com.gaigrill.restaurantbackend.dev;

import com.gaigrill.restaurantbackend.model.JiraEmployee;
import com.gaigrill.restaurantbackend.repository.JiraEmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasscodeHashMigrator implements CommandLineRunner {

    private final JiraEmployeeRepository repo;
    private final PasswordEncoder encoder;

    public PasscodeHashMigrator(JiraEmployeeRepository repo, PasswordEncoder encoder) {
        this.repo = repo; this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        repo.findAll().forEach(e -> {
            if (e.getPasscodeHash() == null && e.getPasscode() != null && !e.getPasscode().isBlank()) {
                e.setPasscodeHash(encoder.encode(e.getPasscode()));
                repo.save(e);
                System.out.println("Hashed passcode for " + e.getEmployeeId());
            }
        });
    }
}
