package com.hirehub.core.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmployeeAdminDTO {
    private Long id;
    private String name;
    private String email;
    private String companyName;
}
