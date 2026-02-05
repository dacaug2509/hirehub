package com.hirehub.core.controllers;

import com.hirehub.core.entities.Job;
import com.hirehub.core.repositories.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    // ✅ GLOBAL JOB LIST (FOR CANDIDATES)
    @GetMapping("/open")
    public List<Job> getAllOpenJobs() {
        return jobRepository.findByStatus(Job.Status.OPEN);
    }
}
