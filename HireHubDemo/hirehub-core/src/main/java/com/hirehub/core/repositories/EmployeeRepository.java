package com.hirehub.core.repositories;

import com.hirehub.core.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByUserId(Long userId);

    List<Employee> findByCompanyId(Long companyId);
}
