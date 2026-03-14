package com.adrigm.petconnectbackend.features.emergency;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmergencyRepository extends JpaRepository<EmergencyEvent, Long> {
    List<EmergencyEvent> findByOwnerId(Long ownerId);

    List<EmergencyEvent> findByClinicId(Long clinicId);
}
