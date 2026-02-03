package com.example.companyservice.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/company")
public class CompanyServiceController {

    @GetMapping("/test")
    public String test() {
        return "company-service working";
    }
}