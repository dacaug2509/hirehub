package com.hirehub.core.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "candidates")
@Data
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    private String skills; // JSON or Comma Separated
    private Double experience;

    @Column(name = "resume_url")
    private String resumeUrl;

    @Column(name = "profile_url")
    private String profileUrl;
}
