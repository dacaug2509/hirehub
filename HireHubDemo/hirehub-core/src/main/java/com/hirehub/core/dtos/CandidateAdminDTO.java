package com.hirehub.core.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CandidateAdminDTO {
    private Long id;
    private String name;
    private String email;
}
