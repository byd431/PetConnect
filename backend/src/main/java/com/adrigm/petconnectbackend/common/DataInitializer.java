package com.adrigm.petconnectbackend.common;

import com.adrigm.petconnectbackend.features.auth.AuthDTOs;
import com.adrigm.petconnectbackend.features.auth.AuthService;
import com.adrigm.petconnectbackend.features.clinic.Clinic;
import com.adrigm.petconnectbackend.features.clinic.ClinicRepository;
import com.adrigm.petconnectbackend.features.pet.Pet;
import com.adrigm.petconnectbackend.features.pet.PetRepository;
import com.adrigm.petconnectbackend.features.pet.Species;
import com.adrigm.petconnectbackend.features.social.Post;
import com.adrigm.petconnectbackend.features.social.PostRepository;
import com.adrigm.petconnectbackend.features.social.PostType;
import com.adrigm.petconnectbackend.features.user.User;
import com.adrigm.petconnectbackend.features.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

        @Autowired
        private AuthService authService;

        @Autowired
        private ClinicRepository clinicRepository;

        @Autowired
        private PetRepository petRepository;

        @Autowired
        private PostRepository postRepository;

        @Autowired
        private UserRepository userRepository;

        @Override
        public void run(String... args) throws Exception {
                // 1. Users

                try {
                        String adminPassword = System.getenv("ADMIN_PASSWORD") != null ? System.getenv("ADMIN_PASSWORD")
                                        : "admin123";
                        authService.register(
                                        new AuthDTOs.RegisterRequest("admin@petconnect.com", adminPassword, "Admin",
                                                        "User",
                                                        "00000000A", "600000000", "ADMIN", null, null));
                        String userPassword = System.getenv("USER_PASSWORD") != null ? System.getenv("USER_PASSWORD")
                                        : "password";
                        authService.register(
                                        new AuthDTOs.RegisterRequest("usuario@test.com", userPassword, "Juan", "Pérez",
                                                        "12345678Z", "612345678", "OWNER", null, null));
                        authService.register(new AuthDTOs.RegisterRequest("vet@petconnect.com", userPassword, "Laura",
                                        "Veterinaria",
                                        "87654321B", "699000111", "VET", null, null));
                } catch (Exception e) {
                        // Users might already exist if H2 didn't reset (unlikely with mem) or ddl-auto
                        // update
                        System.out.println("Users might already exist: " + e.getMessage());
                }

                User owner = userRepository.findByEmail("usuario@test.com").orElse(null);
                User admin = userRepository.findByEmail("admin@petconnect.com").orElse(null);

                // 2. Pet (Rex)
                if (owner != null && petRepository.count() == 0) {
                        Pet rex = Pet.builder()
                                        .owner(owner)
                                        .nombre("Rex")
                                        .chip("123456789")
                                        .especie(Species.PERRO)
                                        .raza("Pastor Alemán")
                                        .color("Negro/Fuego")
                                        .sexo("Macho")
                                        .peso(32.5)
                                        .fechaNacimiento(LocalDate.of(2020, 5, 20))
                                        .observaciones("Alérgico al pollo. Muy activo.")
                                        .build();
                        petRepository.save(rex);
                }

                // 3. Clinics (Málaga)
                if (clinicRepository.count() == 0) {
                        clinicRepository.save(
                                        new Clinic(null, "Clínica Veterinaria Málaga Centro", 36.7213, -4.4214, true,
                                                        "952000001", "Calle Larios, 1", "24h"));
                        clinicRepository.save(
                                        new Clinic(null, "Hospital Veterinario El Cónsul", 36.7200, -4.4500, false,
                                                        "952000002", "Av. Plutarco, 55", "9:00 - 21:00"));
                        clinicRepository.save(new Clinic(null, "Clínica Teatinos", 36.7180, -4.4600, false, "952000003",
                                        "Calle Hermes, 4", "10:00 - 20:00"));
                        clinicRepository.save(new Clinic(null, "Urgencias Veterinarias Sur", 36.7000, -4.4300, true,
                                        "952000004",
                                        "Av. Velázquez, 100", "24h"));
                        clinicRepository.save(new Clinic(null, "Centro Veterinario Pedregalejo", 36.7250, -4.3800,
                                        false,
                                        "952000005", "Calle Juan Sebastián Elcano, 12", "9:00 - 14:00"));
                }

                // 4. Social Posts
                if (postRepository.count() == 0 && admin != null) {
                        postRepository.save(new Post(null, admin, "Jornada de Vacunación Gratuita",
                                        "El próximo sábado tendremos jornada de vacunación antirrábica en la plaza central. ¡No faltes!",
                                        PostType.EVENTO, LocalDateTime.now().minusDays(1)));
                        postRepository.save(new Post(null, owner, "¡Gatito perdido en Teatinos!",
                                        "Se ha perdido mi gato Félix, es blanco y negro. Si lo veis, por favor llamadme.",
                                        PostType.PERDIDO,
                                        LocalDateTime.now().minusHours(5)));
                        postRepository.save(new Post(null, admin, "Nuevo servicio de peluquería",
                                        "Ahora contamos con servicio de peluquería canina los martes y jueves.",
                                        PostType.EVENTO,
                                        LocalDateTime.now()));
                }
        }
}
