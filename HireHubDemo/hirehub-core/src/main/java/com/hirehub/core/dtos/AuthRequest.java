package com.hirehub.core.dtos;

import lombok.Data;
import com.hirehub.core.entities.User;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
