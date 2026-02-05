package com.hirehub.core.dtos;

import lombok.Data;
import com.hirehub.core.entities.User.Role;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private Role role;
    private String name;

    // For Candidate
    private String skills;
    private Double experience;
    private String resumeUrl;
    private String profileUrl;

    // For Employee
    private Long companyId; // If registering employee via Core (Optional)
}
