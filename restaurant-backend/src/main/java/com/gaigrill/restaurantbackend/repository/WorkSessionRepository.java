package com.gaigrill.restaurantbackend.repository;

import com.gaigrill.restaurantbackend.model.WorkSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkSessionRepository extends JpaRepository<WorkSession, Long> {
    Optional<WorkSession> findFirstByEmployeeIdAndEndedAtIsNullOrderByStartedAtDesc(String employeeId);
}
