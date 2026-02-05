package com.hirehub.core.controllers;

import com.hirehub.core.entities.*;
import com.hirehub.core.repositories.*;
import com.hirehub.core.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/candidate")
@CrossOrigin
@PreAuthorize("hasAuthority('ROLE_CANDIDATE')")
public class CandidateController {

    @Autowired private JobRepository jobRepository;
    @Autowired private JobApplicationRepository applicationRepository;
    @Autowired private CandidateRepository candidateRepository;
    @Autowired private JwtService jwtService;
    @Autowired private UserRepository userRepository;

    private Candidate getCandidate(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String email = jwtService.extractUsername(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return candidateRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
    }

    // ================= FIND JOBS (WITH SEARCH) =================
    @GetMapping("/jobs")
    public List<Job> getAllOpenJobs(
            @RequestParam(required = false) String search
    ) {

        LocalDateTime now = LocalDateTime.now();

        List<Job> jobs = (search == null || search.isBlank())
                ? jobRepository.findByStatus(Job.Status.OPEN)
                : jobRepository.findByStatusAndTitleContainingIgnoreCase(
                        Job.Status.OPEN,
                        search
                );

        // ✅ Auto-expire after 10 days
        return jobs.stream()
                .filter(job -> {
                    if (job.getCreatedAt() == null) return true;
                    return job.getCreatedAt()
                            .plusDays(10)
                            .isAfter(now);
                })
                .collect(Collectors.toList());
    }

    // ================= APPLY JOB =================
    @PostMapping("/apply/{jobId}")
    public ResponseEntity<?> applyJob(
            @PathVariable Long jobId,
            HttpServletRequest request
    ) {
        Candidate candidate = getCandidate(request);

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (job.getCreatedAt() != null &&
                job.getCreatedAt().plusDays(10).isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Job is closed");
        }

        if (applicationRepository
                .findByJobIdAndCandidateId(jobId, candidate.getId())
                .isPresent()) {
            return ResponseEntity.badRequest().body("Already applied");
        }

        JobApplication application = new JobApplication();
        application.setJob(job);
        application.setCandidate(candidate);
        application.setStatus(JobApplication.Status.APPLIED);

        applicationRepository.save(application);

        return ResponseEntity.ok("Applied successfully");
    }

    // ================= MY APPLICATIONS =================
    @GetMapping("/applications")
    public List<JobApplication> myApplications(HttpServletRequest request) {
        Candidate candidate = getCandidate(request);
        return applicationRepository.findByCandidateId(candidate.getId());
    }
}
