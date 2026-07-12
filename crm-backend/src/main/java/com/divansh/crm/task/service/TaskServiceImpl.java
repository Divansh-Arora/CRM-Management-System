package com.divansh.crm.task.service;

import com.divansh.crm.task.dto.request.TaskRequest;
import com.divansh.crm.task.dto.response.TaskResponse;
import com.divansh.crm.task.entity.Task;
import com.divansh.crm.task.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public TaskResponse addTask(TaskRequest request) {

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .assignedEmployee(request.getAssignedEmployee())
                .priority(request.getPriority())
                .status(request.getStatus())
                .dueDate(request.getDueDate())
                .build();

        Task saved = taskRepository.save(task);

        return TaskResponse.builder()
                .id(saved.getId())
                .title(saved.getTitle())
                .description(saved.getDescription())
                .assignedEmployee(saved.getAssignedEmployee())
                .priority(saved.getPriority())
                .status(saved.getStatus())
                .dueDate(saved.getDueDate())
                .createdAt(saved.getCreatedAt())
                .build();
    }

    @Override
    public TaskResponse getTaskById(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .assignedEmployee(task.getAssignedEmployee())
                .priority(task.getPriority())
                .status(task.getStatus())
                .dueDate(task.getDueDate())
                .createdAt(task.getCreatedAt())
                .build();
    }

    @Override
    public List<TaskResponse> getAllTasks() {

        List<Task> tasks = taskRepository.findAll();

        List<TaskResponse> response = new ArrayList<>();

        for (Task task : tasks) {

            response.add(
                    TaskResponse.builder()
                            .id(task.getId())
                            .title(task.getTitle())
                            .description(task.getDescription())
                            .assignedEmployee(task.getAssignedEmployee())
                            .priority(task.getPriority())
                            .status(task.getStatus())
                            .dueDate(task.getDueDate())
                            .createdAt(task.getCreatedAt())
                            .build()
            );
        }

        return response;
    }

    @Override
    public TaskResponse updateTask(Long id, TaskRequest request) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setAssignedEmployee(request.getAssignedEmployee());
        task.setPriority(request.getPriority());
        task.setStatus(request.getStatus());
        task.setDueDate(request.getDueDate());

        Task updated = taskRepository.save(task);

        return TaskResponse.builder()
                .id(updated.getId())
                .title(updated.getTitle())
                .description(updated.getDescription())
                .assignedEmployee(updated.getAssignedEmployee())
                .priority(updated.getPriority())
                .status(updated.getStatus())
                .dueDate(updated.getDueDate())
                .createdAt(updated.getCreatedAt())
                .build();
    }

    @Override
    public void deleteTask(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        taskRepository.delete(task);
    }
    @Override
    public Page<TaskResponse> searchTasks(
            String title,
            int page,
            int size,
            String sortBy) {

        Pageable pageable =
                PageRequest.of(page, size, Sort.by(sortBy));

        Page<Task> tasks =
                taskRepository.findByTitleContainingIgnoreCase(
                        title,
                        pageable);

        return tasks.map(task ->

                TaskResponse.builder()
                        .id(task.getId())
                        .title(task.getTitle())
                        .description(task.getDescription())
                        .assignedEmployee(task.getAssignedEmployee())
                        .priority(task.getPriority())
                        .status(task.getStatus())
                        .dueDate(task.getDueDate())
                        .createdAt(task.getCreatedAt())
                        .build()

        );
    }
}