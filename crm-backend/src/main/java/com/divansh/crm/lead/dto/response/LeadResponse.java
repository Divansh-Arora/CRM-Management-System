package com.divansh.crm.lead.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeadResponse {

    private Long id;

    private String customerName;

    private String email;

    private String phone;

    private String company;

    private String source;

    private String status;

    private String assignedTo;

    private LocalDateTime createdAt;
}