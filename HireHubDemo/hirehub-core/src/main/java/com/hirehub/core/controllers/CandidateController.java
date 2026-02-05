package com.hirehub.core.controllers;

import com.hirehub.core.entities.*;
import com.hirehub.core.repositories.*;
import com.hirehub.core.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/candidate")
@CrossOrigin
@PreAuthorize("hasAuthority('ROLE_CANDIDATE')")
public class CandidateController {

        @Autowired
        private JobRepository jobRepository;
        @Autowired
        private JobApplicationRepository applicationRepository;
        @Autowired
        private CandidateRepository candidateRepository;
        @Autowired
        private CandidateInfoRepository candidateInfoRepository;
        @Autowired
        private JwtService jwtService;
        @Autowired
        private UserRepository userRepository;

        private Candidate getCandidate(HttpServletRequest request) {
                String token = request.getHeader("Authorization").substring(7);
                String email = jwtService.extractUsername(token);

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                return candidateRepository.findByUserId(user.getId())
                                .orElseThrow(() -> new RuntimeException("Candidate not found"));
        }

        // ================= JOB SEARCH =================

        @GetMapping("/jobs")
        public List<Job> getAllOpenJobs(
                        @RequestParam(required = false) String search) {

                LocalDateTime now = LocalDateTime.now();

                List<Job> jobs = (search == null || search.isBlank())
                                ? jobRepository.findByStatus(Job.Status.OPEN)
                                : jobRepository.findByStatusAndTitleContainingIgnoreCase(
                                                Job.Status.OPEN, search);

                return jobs.stream()
                                .filter(job -> job.getCreatedAt() == null ||
                                                job.getCreatedAt().plusDays(10).isAfter(now))
                                .collect(Collectors.toList());
        }

        // ================= APPLY JOB =================

        @PostMapping("/apply/{jobId}")
        public ResponseEntity<?> applyJob(
                        @PathVariable Long jobId,
                        HttpServletRequest request) {

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

                JobApplication app = new JobApplication();
                app.setJob(job);
                app.setCandidate(candidate);
                app.setStatus(JobApplication.Status.APPLIED);

                applicationRepository.save(app);

                return ResponseEntity.ok("Applied successfully");
        }

        // ================= MY APPLICATIONS =================

        @GetMapping("/applications")
        public List<JobApplication> myApplications(HttpServletRequest request) {
                Candidate candidate = getCandidate(request);
                return applicationRepository.findByCandidateId(candidate.getId());
        }

        // ================= PROFILE =================

        @GetMapping("/profile/name")
        public ResponseEntity<String> getCandidateName(HttpServletRequest request) {
                return ResponseEntity.ok(getCandidate(request).getName());
        }

        @GetMapping("/profile")
        public CandidateInfo getProfile(HttpServletRequest request) {

                Candidate candidate = getCandidate(request);

                return candidateInfoRepository
                                .findByCandidateId(candidate.getId())
                                .orElseGet(() -> {
                                        CandidateInfo info = new CandidateInfo();
                                        info.setCandidate(candidate);
                                        return candidateInfoRepository.save(info);
                                });
        }

        // ================= PROFILE UPDATE + RESUME UPLOAD =================

        @PutMapping(value = "/profile", consumes = { "multipart/form-data" })
        public CandidateInfo updateProfile(
                        @RequestParam String skills,
                        @RequestParam String certifications,
                        @RequestParam String githubUrl,
                        @RequestParam String linkedinUrl,
                        @RequestParam String achievements,
                        @RequestParam(required = false) MultipartFile resume,
                        HttpServletRequest request) throws IOException {

                Candidate candidate = getCandidate(request);

                CandidateInfo info = candidateInfoRepository
                                .findByCandidateId(candidate.getId())
                                .orElse(new CandidateInfo());

                info.setCandidate(candidate);
                info.setSkills(skills);
                info.setCertifications(certifications);
                info.setGithubUrl(githubUrl);
                info.setLinkedinUrl(linkedinUrl);
                info.setAchievements(achievements);

                // ===== Resume Upload Logic =====
                if (resume != null && !resume.isEmpty()) {

                        String contentType = resume.getContentType();
                        if (!contentType.equals("application/pdf")
                                        && !contentType.startsWith("image/")) {
                                throw new RuntimeException("Only PDF or image resumes allowed");
                        }

                        String fileName = UUID.randomUUID() + "_" + resume.getOriginalFilename();
                        Path uploadPath = Paths.get("uploads/resumes/" + fileName);

                        Files.createDirectories(uploadPath.getParent());
                        Files.write(uploadPath, resume.getBytes());

                        info.setResumeUrl("/uploads/resumes/" + fileName);
                }

                return candidateInfoRepository.save(info);
        }
}
