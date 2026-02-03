package com.example.auth.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/register")
    public String register() {
        return "User Registered";
    }

    @PostMapping("/login")
    public String login() {
        return "User Logged In";
    }
}