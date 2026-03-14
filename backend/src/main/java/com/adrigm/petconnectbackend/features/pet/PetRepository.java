package com.adrigm.petconnectbackend.features.pet;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByOwnerId(Long ownerId);

    Optional<Pet> findByChip(String chip);
}
