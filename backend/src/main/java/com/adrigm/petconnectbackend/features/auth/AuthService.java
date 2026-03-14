package com.adrigm.petconnectbackend.features.auth;

import com.adrigm.petconnectbackend.features.user.User;
import com.adrigm.petconnectbackend.features.user.UserRepository;
import com.adrigm.petconnectbackend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;

@Service
public class AuthService {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Autowired
        private JwtUtil jwtUtil;

        @Autowired
        private AuthenticationManager authenticationManager;

        public AuthDTOs.AuthResponse register(AuthDTOs.RegisterRequest request) {
                if (userRepository.existsByEmail(request.getEmail())) {
                        throw new RuntimeException("Email already exists");
                }

                User user = User.builder()
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .nombre(request.getNombre())
                                .apellidos(request.getApellidos())
                                .dni(request.getDni())

                                .telefono(request.getTelefono())
                                .interests(request.getInterests())
                                .favoriteClinics(request.getFavoriteClinics())
                                .roles(Collections
                                                .singletonList(request.getRole() != null ? request.getRole() : "OWNER"))
                                .build();

                User savedUser = userRepository.save(user);

                String token = jwtUtil.generateToken(savedUser.getEmail());
                return new AuthDTOs.AuthResponse(token, savedUser.getEmail(), savedUser.getNombre(),
                                savedUser.getRoles(),
                                savedUser.getId(), savedUser.getFotoUrl());
        }

        public AuthDTOs.AuthResponse login(AuthDTOs.LoginRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

                User user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new RuntimeException("User not found"));

                String token = jwtUtil.generateToken(user.getEmail());
                return new AuthDTOs.AuthResponse(token, user.getEmail(), user.getNombre(), user.getRoles(),
                                user.getId(),
                                user.getFotoUrl());
        }
}
