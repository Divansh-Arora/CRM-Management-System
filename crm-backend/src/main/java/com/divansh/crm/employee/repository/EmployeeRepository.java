package com.divansh.crm.employee.repository;

import com.divansh.crm.employee.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    long countByDepartment(String department);

    Page<Employee> findByNameContainingIgnoreCase(
            String name,
            Pageable pageable
    );
}