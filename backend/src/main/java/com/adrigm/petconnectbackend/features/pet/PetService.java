package com.adrigm.petconnectbackend.features.pet;

import com.adrigm.petconnectbackend.features.user.User;
import com.adrigm.petconnectbackend.features.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Pet> getPetsByOwner(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return petRepository.findByOwnerId(user.getId());
    }

    public Pet addPet(Pet pet, String ownerEmail) {
        User user = userRepository.findByEmail(ownerEmail).orElseThrow(() -> new RuntimeException("User not found"));
        pet.setOwner(user);
        return petRepository.save(pet);
    }

    public Pet getPetById(Long id) {
        return petRepository.findById(id).orElseThrow(() -> new RuntimeException("Pet not found"));
    }

    public Pet updatePet(Long id, Pet petDetails) {
        Pet pet = getPetById(id);
        pet.setNombre(petDetails.getNombre());
        pet.setRaza(petDetails.getRaza());
        pet.setEspecie(petDetails.getEspecie());
        pet.setChip(petDetails.getChip());
        pet.setPeso(petDetails.getPeso());
        pet.setFechaNacimiento(petDetails.getFechaNacimiento());
        pet.setSexo(petDetails.getSexo());
        pet.setColor(petDetails.getColor());
        // fotoUrl is not sent by edit form yet, but if it was:
        if (petDetails.getFotoUrl() != null)
            pet.setFotoUrl(petDetails.getFotoUrl());

        return petRepository.save(pet);
    }
}
