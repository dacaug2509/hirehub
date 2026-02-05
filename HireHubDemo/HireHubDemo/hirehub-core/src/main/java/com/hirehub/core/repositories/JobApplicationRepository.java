package com.hirehub.core.repositories;

import com.hirehub.core.entities.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    Optional<JobApplication> findByJobIdAndCandidateId(Long jobId, Long candidateId);

    List<JobApplication> findByCandidateId(Long candidateId);

    // ✅ REQUIRED FOR APPLICANTS FEATURE
    List<JobApplication> findByJobId(Long jobId);
}
