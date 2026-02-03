package com.example.jobservice.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/jobs")
public class JobController {

    @GetMapping("/test")
    public String test() {
        return "Job Service Working";
    }
}