package com.hirehub.core.controllers;

import com.hirehub.core.dtos.ApplicantDTO;
import com.hirehub.core.entities.*;
import com.hirehub.core.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/company")
@CrossOrigin
public class CompanyController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // ===================== JOBS WITH APPLICANT COUNT =====================

    @GetMapping("/jobs")
    public List<?> getCompanyJobs(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Company company = companyRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        List<Job> jobs = jobRepository.findByCompanyId(company.getId());

        // 🔹 Add applicant count per job
        return jobs.stream().map(job -> new Object() {
            public final Long id = job.getId();
            public final String title = job.getTitle();
            public final String description = job.getDescription();
            public final String requiredSkills = job.getRequiredSkills();
            public final Job.Status status = job.getStatus();
            public final long applicantCount =
                    jobApplicationRepository.findByJobId(job.getId()).size();
        }).toList();
    }

    // ===================== CREATE JOB =====================

    @PostMapping("/jobs")
    public Job createJob(@RequestBody Job job, Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Company company = companyRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        job.setId(null);
        job.setCompany(company);
        job.setStatus(Job.Status.OPEN);

        return jobRepository.save(job);
    }

    // ===================== DELETE JOB =====================

    @DeleteMapping("/jobs/{id}")
    public void deleteJob(@PathVariable Long id, Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Company company = companyRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getCompany().getId().equals(company.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        jobRepository.delete(job);
    }

    // ===================== APPLICANTS =====================

    @GetMapping("/jobs/{jobId}/applicants")
    public List<ApplicantDTO> getApplicants(
            @PathVariable Long jobId,
            Authentication authentication
    ) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Company company = companyRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getCompany().getId().equals(company.getId())) {
            throw new RuntimeException("Unauthorized access");
        }

        return jobApplicationRepository.findByJobId(jobId)
                .stream()
                .map(app -> new ApplicantDTO(
                        app.getId(),
                        app.getCandidate().getUser().getEmail(),
                        app.getCandidate().getSkills(),
                        app.getStatus()
                ))
                .toList();
    }

    // ===================== STATUS UPDATE =====================

    @PutMapping("/applications/{applicationId}/status/{status}")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable Long applicationId,
            @PathVariable String status,
            Authentication authentication
    ) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Company company = companyRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if (!application.getJob().getCompany().getId().equals(company.getId())) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        application.setStatus(JobApplication.Status.valueOf(status));
        jobApplicationRepository.save(application);

        return ResponseEntity.ok("Status updated");
    }

    // ===================== EMPLOYEES =====================

    @GetMapping("/employees")
    public List<Employee> getCompanyEmployees(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Company company = companyRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        return employeeRepository.findByCompanyId(company.getId());
    }
}
