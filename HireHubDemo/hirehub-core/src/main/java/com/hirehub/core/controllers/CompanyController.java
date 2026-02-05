package com.hirehub.core.controllers;

import com.hirehub.core.dtos.ApplicantDTO;
import com.hirehub.core.entities.*;
import com.hirehub.core.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        @Autowired
        private CandidateInfoRepository candidateInfoRepository;
        @Autowired
        private ReferralRepository referralRepository;

        @GetMapping("/profile")
        public ResponseEntity<?> getProfile(Authentication authentication) {
                User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
                Company company = companyRepository.findByUserId(user.getId()).orElseThrow();
                return ResponseEntity.ok(company);
        }

        // ===================== JOBS WITH APPLICANT COUNT =====================

        @GetMapping("/jobs")
        public List<?> getCompanyJobs(Authentication authentication) {

                User user = userRepository.findByEmail(authentication.getName())
                                .orElseThrow();

                Company company = companyRepository.findByUserId(user.getId())
                                .orElseThrow();

                return jobRepository.findByCompanyId(company.getId())
                                .stream()
                                .map(job -> new Object() {
                                        public final Long id = job.getId();
                                        public final String title = job.getTitle();
                                        public final String description = job.getDescription();
                                        public final String requiredSkills = job.getRequiredSkills();
                                        public final Job.Status status = job.getStatus();
                                        public final long applicantCount = jobApplicationRepository
                                                        .findByJobId(job.getId()).size();
                                })
                                .toList();
        }

        // ===================== CREATE JOB =====================

        @PostMapping("/jobs")
        public Job createJob(@RequestBody Job job, Authentication authentication) {

                User user = userRepository.findByEmail(authentication.getName())
                                .orElseThrow();

                Company company = companyRepository.findByUserId(user.getId())
                                .orElseThrow();

                job.setId(null);
                job.setCompany(company);
                job.setStatus(Job.Status.OPEN);

                return jobRepository.save(job);
        }

        // ===================== DELETE JOB =====================

        @DeleteMapping("/jobs/{id}")
        public void deleteJob(@PathVariable Long id, Authentication authentication) {

                User user = userRepository.findByEmail(authentication.getName())
                                .orElseThrow();

                Company company = companyRepository.findByUserId(user.getId())
                                .orElseThrow();

                Job job = jobRepository.findById(id)
                                .orElseThrow();

                if (!job.getCompany().getId().equals(company.getId())) {
                        throw new RuntimeException("Unauthorized");
                }

                jobRepository.delete(job);
        }

        // ===================== APPLICANTS (WITH REFERRAL INFO) =====================

        @GetMapping("/jobs/{jobId}/applicants")
        public List<ApplicantDTO> getApplicants(
                        @PathVariable Long jobId,
                        Authentication authentication) {

                User user = userRepository.findByEmail(authentication.getName())
                                .orElseThrow();

                Company company = companyRepository.findByUserId(user.getId())
                                .orElseThrow();

                Job job = jobRepository.findById(jobId)
                                .orElseThrow();

                if (!job.getCompany().getId().equals(company.getId())) {
                        throw new RuntimeException("Unauthorized access");
                }

                return jobApplicationRepository.findByJobId(jobId)
                                .stream()
                                .map(app -> {
                                        // Check if this candidate was referred by an employee
                                        var referral = referralRepository.findByJobIdAndCandidateId(
                                                        jobId,
                                                        app.getCandidate().getId());

                                        Long referredByEmployeeId = null;
                                        String referredByEmployeeName = null;

                                        if (referral.isPresent()) {
                                                var employee = employeeRepository
                                                                .findById(referral.get().getEmployeeId())
                                                                .orElse(null);
                                                if (employee != null) {
                                                        referredByEmployeeId = employee.getId();
                                                        referredByEmployeeName = employee.getName();
                                                }
                                        }

                                        return new ApplicantDTO(
                                                        app.getId(), // applicationId
                                                        app.getCandidate().getId(), // candidateId
                                                        app.getCandidate().getName(), // candidateName
                                                        app.getCandidate().getUser().getEmail(),
                                                        app.getCandidate().getSkills(),
                                                        app.getStatus(),
                                                        referredByEmployeeId, // referral info
                                                        referredByEmployeeName // referral info
                                        );
                                })
                                .toList();
        }

        // ===================== VIEW CANDIDATE PROFILE =====================

        @GetMapping("/candidate/{candidateId}/profile")
        public CandidateInfo viewCandidateProfile(
                        @PathVariable Long candidateId,
                        Authentication authentication) {

                User user = userRepository.findByEmail(authentication.getName())
                                .orElseThrow();

                Company company = companyRepository.findByUserId(user.getId())
                                .orElseThrow();

                boolean hasApplied = jobApplicationRepository
                                .findByCandidateId(candidateId)
                                .stream()
                                .anyMatch(app -> app.getJob().getCompany().getId().equals(company.getId()));

                if (!hasApplied) {
                        throw new RuntimeException("Unauthorized access");
                }

                return candidateInfoRepository
                                .findByCandidateId(candidateId)
                                .orElseThrow(() -> new RuntimeException("Candidate profile not found"));
        }

        // ===================== STATUS UPDATE =====================

        @PutMapping("/applications/{applicationId}/status/{status}")
        public ResponseEntity<?> updateApplicationStatus(
                        @PathVariable Long applicationId,
                        @PathVariable String status,
                        Authentication authentication) {

                User user = userRepository.findByEmail(authentication.getName())
                                .orElseThrow();

                Company company = companyRepository.findByUserId(user.getId())
                                .orElseThrow();

                JobApplication application = jobApplicationRepository.findById(applicationId)
                                .orElseThrow();

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
                                .orElseThrow();

                Company company = companyRepository.findByUserId(user.getId())
                                .orElseThrow();

                return employeeRepository.findByCompanyId(company.getId());
        }
}
