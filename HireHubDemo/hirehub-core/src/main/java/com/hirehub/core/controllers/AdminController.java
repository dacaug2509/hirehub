package com.hirehub.core.controllers;

import com.hirehub.core.dtos.EmployeeAdminDTO;
import com.hirehub.core.dtos.CandidateAdminDTO;
import com.hirehub.core.entities.Company;
import com.hirehub.core.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    /* =========================
       COMPANIES
    ========================= */

    @GetMapping("/companies")
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @PutMapping("/companies/{id}/approve")
    public void approveCompany(@PathVariable Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        company.setStatus(Company.Status.APPROVED);
        company.getUser().setActive(true);

        companyRepository.save(company);
        userRepository.save(company.getUser());
    }

    @PutMapping("/companies/{id}/block")
    public void blockCompany(@PathVariable Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        company.setStatus(Company.Status.BLOCKED);
        company.getUser().setActive(false);

        companyRepository.save(company);
        userRepository.save(company.getUser());
    }

    /* =========================
       EMPLOYEES (FIXED)
    ========================= */

    @GetMapping("/employees")
    public List<EmployeeAdminDTO> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(e -> new EmployeeAdminDTO(
                        e.getId(),
                        e.getName(),
                        e.getUser().getEmail(),
                        e.getCompany().getName()   // ✅ NEVER UNKNOWN NOW
                ))
                .toList();
    }

    /* =========================
       CANDIDATES
    ========================= */

    @GetMapping("/candidates")
    public List<CandidateAdminDTO> getAllCandidates() {
        return candidateRepository.findAll()
                .stream()
                .map(c -> new CandidateAdminDTO(
                        c.getId(),
                        c.getName(),
                        c.getUser().getEmail()
                ))
                .toList();
    }
}
