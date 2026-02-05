package com.hirehub.core.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "candidate_info")
@Data
public class CandidateInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔗 One-to-One mapping with Candidate
    @OneToOne
    @JoinColumn(name = "candidate_id", nullable = false, unique = true)
    private Candidate candidate;

    @Column(columnDefinition = "TEXT")
    private String skills;

    @Column(columnDefinition = "TEXT")
    private String certifications;

    private String githubUrl;

    private String linkedinUrl;

    @Column(columnDefinition = "TEXT")
    private String achievements;

    // ✅ RESUME PATH (PDF / IMAGE)
    private String resumeUrl;
}
