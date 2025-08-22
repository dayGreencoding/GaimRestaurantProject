package com.gaigrill.restaurantbackend.repository;

import com.gaigrill.restaurantbackend.model.Customer;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Long> {
}
