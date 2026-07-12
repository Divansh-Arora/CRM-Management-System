package com.divansh.crm.dashboard.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private long totalCustomers;

    private long activeCustomers;

    private long totalEmployees;

    private long totalLeads;

    private long convertedLeads;

    private long totalTasks;

    private long completedTasks;

    private long pendingTasks;
}