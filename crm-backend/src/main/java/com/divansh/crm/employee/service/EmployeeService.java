package com.divansh.crm.employee.service;

import com.divansh.crm.employee.dto.request.EmployeeRequest;
import org.springframework.data.domain.Page;
import com.divansh.crm.employee.dto.response.EmployeeResponse;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse addEmployee(EmployeeRequest request);

    EmployeeResponse getEmployeeById(Long id);

    List<EmployeeResponse> getAllEmployees();
    Page<EmployeeResponse> searchEmployees(
            String name,
            int page,
            int size,
            String sortBy
    );

    EmployeeResponse updateEmployee(Long id, EmployeeRequest request);

    void deleteEmployee(Long id);
}