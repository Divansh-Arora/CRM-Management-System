package com.divansh.crm.lead.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LeadRequest {

    @NotBlank
    private String customerName;

    @Email
    private String email;

    @NotBlank
    private String phone;

    private String company;

    private String source;

    private String status;

    private String assignedTo;

}