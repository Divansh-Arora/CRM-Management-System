package com.divansh.crm.employee.service;

import com.divansh.crm.employee.dto.request.EmployeeRequest;
import com.divansh.crm.employee.dto.response.EmployeeResponse;
import com.divansh.crm.employee.entity.Employee;
import com.divansh.crm.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public EmployeeResponse addEmployee(EmployeeRequest request) {

        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (employeeRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone already exists");
        }

        Employee employee = Employee.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .department(request.getDepartment())
                .designation(request.getDesignation())
                .salary(request.getSalary())
                .status(request.getStatus())
                .build();

        Employee saved = employeeRepository.save(employee);

        return EmployeeResponse.builder()
                .id(saved.getId())
                .name(saved.getName())
                .email(saved.getEmail())
                .phone(saved.getPhone())
                .department(saved.getDepartment())
                .designation(saved.getDesignation())
                .salary(saved.getSalary())
                .status(saved.getStatus())
                .createdAt(saved.getCreatedAt())
                .build();
    }

    @Override
    public EmployeeResponse getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        return EmployeeResponse.builder()
                .id(employee.getId())
                .name(employee.getName())
                .email(employee.getEmail())
                .phone(employee.getPhone())
                .department(employee.getDepartment())
                .designation(employee.getDesignation())
                .salary(employee.getSalary())
                .status(employee.getStatus())
                .createdAt(employee.getCreatedAt())
                .build();
    }

    @Override
    public List<EmployeeResponse> getAllEmployees() {

        List<Employee> employees = employeeRepository.findAll();

        List<EmployeeResponse> response = new ArrayList<>();

        for (Employee employee : employees) {

            response.add(
                    EmployeeResponse.builder()
                            .id(employee.getId())
                            .name(employee.getName())
                            .email(employee.getEmail())
                            .phone(employee.getPhone())
                            .department(employee.getDepartment())
                            .designation(employee.getDesignation())
                            .salary(employee.getSalary())
                            .status(employee.getStatus())
                            .createdAt(employee.getCreatedAt())
                            .build()
            );
        }

        return response;
    }

    @Override
    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employee.setName(request.getName());
        employee.setEmail(request.getEmail());
        employee.setPhone(request.getPhone());
        employee.setDepartment(request.getDepartment());
        employee.setDesignation(request.getDesignation());
        employee.setSalary(request.getSalary());
        employee.setStatus(request.getStatus());

        Employee updated = employeeRepository.save(employee);

        return EmployeeResponse.builder()
                .id(updated.getId())
                .name(updated.getName())
                .email(updated.getEmail())
                .phone(updated.getPhone())
                .department(updated.getDepartment())
                .designation(updated.getDesignation())
                .salary(updated.getSalary())
                .status(updated.getStatus())
                .createdAt(updated.getCreatedAt())
                .build();
    }

    @Override
    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employeeRepository.delete(employee);
    }
    @Override
    public Page<EmployeeResponse> searchEmployees(
            String name,
            int page,
            int size,
            String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        Page<Employee> employees =
                employeeRepository.findByNameContainingIgnoreCase(
                        name,
                        pageable);

        return employees.map(employee ->

                EmployeeResponse.builder()
                        .id(employee.getId())
                        .name(employee.getName())
                        .email(employee.getEmail())
                        .phone(employee.getPhone())
                        .department(employee.getDepartment())
                        .designation(employee.getDesignation())
                        .salary(employee.getSalary())
                        .status(employee.getStatus())
                        .createdAt(employee.getCreatedAt())
                        .build()

        );
    }
}