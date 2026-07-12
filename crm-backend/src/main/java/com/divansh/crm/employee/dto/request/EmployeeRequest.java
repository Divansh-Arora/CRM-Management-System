package com.divansh.crm.employee.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class EmployeeRequest {

    @NotBlank
    private String name;

    @Email
    private String email;

    @NotBlank
    private String phone;

    private String department;

    private String designation;

    private Double salary;

    private String status;
}