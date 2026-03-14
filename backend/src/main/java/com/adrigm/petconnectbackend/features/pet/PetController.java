package com.adrigm.petconnectbackend.features.pet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    @Autowired
    private PetService petService;

    @GetMapping
    public ResponseEntity<List<Pet>> getMyPets(Principal principal) {
        return ResponseEntity.ok(petService.getPetsByOwner(principal.getName()));
    }

    @PostMapping
    public ResponseEntity<Pet> addPet(@RequestBody Pet pet, Principal principal) {
        return ResponseEntity.ok(petService.addPet(pet, principal.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPet(@PathVariable Long id) {
        return ResponseEntity.ok(petService.getPetById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @RequestBody Pet petDetails) {
        return ResponseEntity.ok(petService.updatePet(id, petDetails));
    }
}
