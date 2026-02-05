package com.hirehub.core.repositories;

import com.hirehub.core.entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByCompanyId(Long companyId);

    List<Job> findByStatus(Job.Status status);

    // ✅ STEP 6: Search by job title (case-insensitive)
    List<Job> findByStatusAndTitleContainingIgnoreCase(
            Job.Status status,
            String title
    );
}
