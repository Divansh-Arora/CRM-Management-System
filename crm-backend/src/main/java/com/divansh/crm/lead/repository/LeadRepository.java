package com.divansh.crm.lead.repository;

import com.divansh.crm.lead.entity.lead;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LeadRepository extends JpaRepository<lead, Long> {

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);
    long countByStatus(String status);


    Page<lead> findByCustomerNameContainingIgnoreCase(
            String customerName,
            Pageable pageable
    );
}