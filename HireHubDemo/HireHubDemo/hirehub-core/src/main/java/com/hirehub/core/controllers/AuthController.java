package com.hirehub.core.controllers;

import com.hirehub.core.dtos.AuthRequest;
import com.hirehub.core.dtos.AuthResponse;
import com.hirehub.core.dtos.RegisterRequest;
import com.hirehub.core.entities.*;
import com.hirehub.core.repositories.*;
import com.hirehub.core.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setActive(true);

        User savedUser = userRepository.save(user);

        switch (request.getRole()) {

            case COMPANY -> {
                Company company = new Company();
                company.setUser(savedUser);
                company.setName(request.getName());
                company.setStatus(Company.Status.PENDING); // 🔴 IMPORTANT
                companyRepository.save(company);

                return ResponseEntity.ok("Company registered. Waiting for admin approval.");
            }

            case CANDIDATE -> {
                Candidate candidate = new Candidate();
                candidate.setUser(savedUser);
                candidate.setName(request.getName());
                candidate.setSkills(request.getSkills());
                candidate.setExperience(request.getExperience());
                candidate.setResumeUrl(request.getResumeUrl());
                candidate.setProfileUrl(request.getProfileUrl());
                candidateRepository.save(candidate);

                return ResponseEntity.ok("Candidate registered successfully");
            }

            case EMPLOYEE -> {
                Company company = companyRepository.findById(request.getCompanyId())
                        .orElseThrow(() -> new RuntimeException("Company not found"));

                Employee employee = new Employee();
                employee.setUser(savedUser);
                employee.setName(request.getName());
                employee.setCompany(company);
                employeeRepository.save(employee);

                return ResponseEntity.ok("Employee registered successfully");
            }

            case ADMIN -> {
                return ResponseEntity.ok("Admin registered");
            }
        }

        return ResponseEntity.badRequest().body("Invalid role");
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        if (!user.isActive()) {
            return ResponseEntity.status(403).body("User inactive");
        }

        // 🔴 BLOCK COMPANY LOGIN IF NOT APPROVED
        if (user.getRole() == User.Role.COMPANY) {
            Company company = companyRepository.findByUserId(user.getId())
                    .orElseThrow();

            if (company.getStatus() != Company.Status.APPROVED) {
                return ResponseEntity.status(403).body("Company not approved by admin");
            }
        }

        // ✅ Spring Security role
        String securityRole = "ROLE_" + user.getRole().name();

        // ✅ Token contains ROLE_COMPANY / ROLE_ADMIN
        String token = jwtService.generateToken(user.getEmail(), securityRole);

        // ✅ Frontend receives COMPANY / ADMIN
        return ResponseEntity.ok(
                new AuthResponse(
                        token,
                        user.getRole(), // IMPORTANT
                        user.getId()
                )
        );
    }

    // ================= SUPPORT =================
    @GetMapping("/companies")
    public ResponseEntity<?> getCompanies() {
        return ResponseEntity.ok(companyRepository.findAll());
    }
}
