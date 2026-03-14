package com.adrigm.petconnectbackend.features.clinic;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ClinicRepository extends JpaRepository<Clinic, Long> {
    List<Clinic> findByEsUrgencia24h(Boolean esUrgencia24h);
}
