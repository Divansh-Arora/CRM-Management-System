package com.divansh.crm.task.service;

import com.divansh.crm.task.dto.request.TaskRequest;
import com.divansh.crm.task.dto.response.TaskResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TaskService {

    TaskResponse addTask(TaskRequest request);

    TaskResponse getTaskById(Long id);

    List<TaskResponse> getAllTasks();
    Page<TaskResponse> searchTasks(
            String title,
            int page,
            int size,
            String sortBy
    );

    TaskResponse updateTask(Long id, TaskRequest request);

    void deleteTask(Long id);

}