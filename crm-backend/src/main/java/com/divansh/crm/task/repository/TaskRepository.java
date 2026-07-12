package com.divansh.crm.task.repository;

import com.divansh.crm.task.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByTitleContainingIgnoreCase(
            String title,
            Pageable pageable
    );

    long countByStatus(String status);

    long countByPriority(String priority);

}