package com.divansh.crm.task.dto.response;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponse {

    private Long id;

    private String title;

    private String description;

    private String assignedEmployee;

    private String priority;

    private String status;

    private LocalDate dueDate;

    private LocalDateTime createdAt;

}