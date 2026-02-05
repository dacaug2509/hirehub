package com.hirehub.core.repositories;

import com.hirehub.core.entities.Referral;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReferralRepository extends JpaRepository<Referral, Long> {

    // Find referral by job and candidate
    Optional<Referral> findByJobIdAndCandidateId(Long jobId, Long candidateId);
}
