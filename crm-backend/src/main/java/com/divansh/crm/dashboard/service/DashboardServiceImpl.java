package com.divansh.crm.dashboard.service;

import com.divansh.crm.customer.entity.CustomerStatus;
import com.divansh.crm.customer.repository.CustomerRepository;
import com.divansh.crm.dashboard.dto.response.DashboardResponse;
import com.divansh.crm.dashboard.service.DashboardService;
import com.divansh.crm.employee.repository.EmployeeRepository;
import com.divansh.crm.lead.repository.LeadRepository;
import com.divansh.crm.task.repository.TaskRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

import com.divansh.crm.dashboard.dto.response.ChartData;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final CustomerRepository customerRepository;
    private final EmployeeRepository employeeRepository;
    private final LeadRepository leadRepository;
    private final TaskRepository taskRepository;

    public DashboardServiceImpl(
            CustomerRepository customerRepository,
            EmployeeRepository employeeRepository,
            LeadRepository leadRepository,
            TaskRepository taskRepository) {

        this.customerRepository = customerRepository;
        this.employeeRepository = employeeRepository;
        this.leadRepository = leadRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public DashboardResponse getDashboard() {

        return DashboardResponse.builder()

                .totalCustomers(customerRepository.count())

                .activeCustomers(
                        customerRepository.countByStatus(CustomerStatus.ACTIVE))

                .totalEmployees(
                        employeeRepository.count())

                .totalLeads(
                        leadRepository.count())

                .convertedLeads(
                        leadRepository.countByStatus("CONVERTED"))

                .totalTasks(
                        taskRepository.count())

                .completedTasks(
                        taskRepository.countByStatus("COMPLETED"))

                .pendingTasks(
                        taskRepository.countByStatus("PENDING"))

                .build();
    }
    @Override
    public List<ChartData> getLeadStatusChart() {

        List<ChartData> list = new ArrayList<>();

        list.add(
                ChartData.builder()
                        .label("NEW")
                        .value(leadRepository.countByStatus("NEW"))
                        .build());

        list.add(
                ChartData.builder()
                        .label("CONTACTED")
                        .value(leadRepository.countByStatus("CONTACTED"))
                        .build());

        list.add(
                ChartData.builder()
                        .label("CONVERTED")
                        .value(leadRepository.countByStatus("CONVERTED"))
                        .build());

        return list;
    }
    @Override
    public List<ChartData> getTaskStatusChart() {

        List<ChartData> list = new ArrayList<>();

        list.add(
                ChartData.builder()
                        .label("PENDING")
                        .value(taskRepository.countByStatus("PENDING"))
                        .build());

        list.add(
                ChartData.builder()
                        .label("IN_PROGRESS")
                        .value(taskRepository.countByStatus("IN_PROGRESS"))
                        .build());

        list.add(
                ChartData.builder()
                        .label("COMPLETED")
                        .value(taskRepository.countByStatus("COMPLETED"))
                        .build());

        return list;
    }
    @Override
    public List<ChartData> getTaskPriorityChart() {

        List<ChartData> list = new ArrayList<>();

        list.add(
                ChartData.builder()
                        .label("LOW")
                        .value(taskRepository.countByPriority("LOW"))
                        .build());

        list.add(
                ChartData.builder()
                        .label("MEDIUM")
                        .value(taskRepository.countByPriority("MEDIUM"))
                        .build());

        list.add(
                ChartData.builder()
                        .label("HIGH")
                        .value(taskRepository.countByPriority("HIGH"))
                        .build());

        return list;
    }
    @Override
    public List<ChartData> getDepartmentChart() {

        List<ChartData> list = new ArrayList<>();

        list.add(
                ChartData.builder()
                        .label("IT")
                        .value(employeeRepository.countByDepartment("IT"))
                        .build());

        list.add(
                ChartData.builder()
                        .label("HR")
                        .value(employeeRepository.countByDepartment("HR"))
                        .build());

        list.add(
                ChartData.builder()
                        .label("Sales")
                        .value(employeeRepository.countByDepartment("Sales"))
                        .build());

        return list;
    }
}