package com.divansh.crm.dashboard.service;

import com.divansh.crm.dashboard.dto.response.DashboardResponse;
import java.util.List;
import com.divansh.crm.dashboard.dto.response.ChartData;

public interface DashboardService {

    DashboardResponse getDashboard();
    List<ChartData> getLeadStatusChart();

    List<ChartData> getTaskStatusChart();

    List<ChartData> getTaskPriorityChart();

    List<ChartData> getDepartmentChart();

}