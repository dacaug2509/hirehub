package com.hirehub.core.repositories;

import com.hirehub.core.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    List<Company> findByStatus(Company.Status status);

    Optional<Company> findByUserId(Long userId);
}
