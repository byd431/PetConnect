package com.adrigm.petconnectbackend.features.emergency;

import com.adrigm.petconnectbackend.features.clinic.Clinic;
import com.adrigm.petconnectbackend.features.clinic.ClinicRepository;
import com.adrigm.petconnectbackend.features.pet.Pet;
import com.adrigm.petconnectbackend.features.pet.PetRepository;
import com.adrigm.petconnectbackend.features.user.User;
import com.adrigm.petconnectbackend.features.user.UserRepository;
import com.adrigm.petconnectbackend.common.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class EmergencyService {

    private final EmergencyRepository emergencyRepository;
    private final ClinicRepository clinicRepository;
    private final PetRepository petRepository;
    private final UserRepository userRepository;

    public EmergencyService(EmergencyRepository emergencyRepository, ClinicRepository clinicRepository,
            PetRepository petRepository, UserRepository userRepository) {
        this.emergencyRepository = emergencyRepository;
        this.clinicRepository = clinicRepository;
        this.petRepository = petRepository;
        this.userRepository = userRepository;
    }

    public EmergencyEvent createEmergency(Long userId, Long petId, Double latitude, Double longitude) {
        User owner = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found"));

        // Find nearest 24h clinic (Simplified logic: finding any 24h clinic for now)
        // In a real scenario, use PostGIS distance calculation
        List<Clinic> clinics = clinicRepository.findAll();
        Clinic nearestClinic = clinics.stream()
                .filter(Clinic::getEsUrgencia24h)
                .min(Comparator
                        .comparingDouble(c -> calculateDistance(latitude, longitude, c.getLatitud(), c.getLongitud())))
                .orElse(clinics.stream().findFirst().orElse(null));

        EmergencyEvent event = new EmergencyEvent(
                pet,
                owner,
                nearestClinic,
                latitude,
                longitude,
                LocalDateTime.now(),
                EmergencyStatus.PENDING);

        return emergencyRepository.save(event);
    }

    // Mock distance calculation (Euclidean for simplicity)
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
    }

    public List<EmergencyEvent> getHistory(Long userId) {
        return emergencyRepository.findByOwnerId(userId);
    }
}
