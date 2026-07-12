package com.divansh.crm.task.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {

    @NotBlank
    private String title;

    private String description;

    private String assignedEmployee;

    private String priority;

    private String status;

    private LocalDate dueDate;

}