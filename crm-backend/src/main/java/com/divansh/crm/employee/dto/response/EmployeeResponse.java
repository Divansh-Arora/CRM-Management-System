package com.divansh.crm.employee.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeResponse {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private String department;

    private String designation;

    private Double salary;

    private String status;

    private LocalDateTime createdAt;
}