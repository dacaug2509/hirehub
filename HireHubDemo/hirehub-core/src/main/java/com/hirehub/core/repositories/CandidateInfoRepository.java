package com.hirehub.core.repositories;

import com.hirehub.core.entities.CandidateInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CandidateInfoRepository extends JpaRepository<CandidateInfo, Long> {

    // 🔍 Fetch profile by candidate ID
    Optional<CandidateInfo> findByCandidateId(Long candidateId);
}
