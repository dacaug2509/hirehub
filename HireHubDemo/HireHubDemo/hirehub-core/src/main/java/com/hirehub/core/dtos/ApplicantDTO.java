package com.hirehub.core.dtos;

import com.hirehub.core.entities.JobApplication;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplicantDTO {

    private Long applicationId; // 🔴 IMPORTANT
    private String email;
    private String skills;
    private JobApplication.Status status;
}
