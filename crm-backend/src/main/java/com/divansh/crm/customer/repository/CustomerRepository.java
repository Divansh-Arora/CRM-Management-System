package com.divansh.crm.customer.repository;

import com.divansh.crm.customer.entity.Customer;
import com.divansh.crm.customer.entity.CustomerStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    boolean existsByEmail(String email);
    long countByStatus(CustomerStatus status);

    boolean existsByPhone(String phone);

    Page<Customer> findByFirstNameContainingIgnoreCase(
            String firstName,
            Pageable pageable
    );

}