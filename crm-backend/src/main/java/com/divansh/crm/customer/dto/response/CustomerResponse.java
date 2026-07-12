package com.divansh.crm.customer.dto.response;

import com.divansh.crm.customer.entity.CustomerStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CustomerResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String company;

    private String city;

    private CustomerStatus status;

    private LocalDateTime createdAt;
}