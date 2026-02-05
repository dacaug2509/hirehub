package com.hirehub.core.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public enum Status {
        PENDING,
        APPROVED,
        BLOCKED   // ✅ REQUIRED
    }
}
