package com.hirehub.core.dtos;

import com.hirehub.core.entities.JobApplication;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplicantDTO {

    private Long applicationId; // application id
    private Long candidateId; // ✅ REQUIRED to open profile
    private String candidateName; // candidate name
    private String email;
    private String skills;
    private JobApplication.Status status;

    // Referral tracking
    private Long referredByEmployeeId;
    private String referredByEmployeeName;
}
