package com.adrigm.petconnectbackend.features.auth;

import java.util.List;

public class AuthDTOs {

    public static class LoginRequest {
        private String email;
        private String password;

        public LoginRequest() {
        }

        public LoginRequest(String email, String password) {
            this.email = email;
            this.password = password;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class RegisterRequest {
        private String email;
        private String password;
        private String nombre;
        private String apellidos;
        private String dni;

        private String telefono;
        private String role; // "OWNER" or "VET"
        private List<String> interests;
        private List<Long> favoriteClinics;

        public RegisterRequest() {
        }

        public RegisterRequest(String email, String password, String nombre, String apellidos, String dni,
                String telefono, String role, List<String> interests, List<Long> favoriteClinics) {
            this.email = email;
            this.password = password;
            this.nombre = nombre;
            this.apellidos = apellidos;
            this.dni = dni;
            this.telefono = telefono;
            this.role = role;
            this.interests = interests;
            this.favoriteClinics = favoriteClinics;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getNombre() {
            return nombre;
        }

        public void setNombre(String nombre) {
            this.nombre = nombre;
        }

        public String getApellidos() {
            return apellidos;
        }

        public void setApellidos(String apellidos) {
            this.apellidos = apellidos;
        }

        public String getDni() {
            return dni;
        }

        public void setDni(String dni) {
            this.dni = dni;
        }

        public String getTelefono() {
            return telefono;
        }

        public void setTelefono(String telefono) {
            this.telefono = telefono;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public List<String> getInterests() {
            return interests;
        }

        public void setInterests(List<String> interests) {
            this.interests = interests;
        }

        public List<Long> getFavoriteClinics() {
            return favoriteClinics;
        }

        public void setFavoriteClinics(List<Long> favoriteClinics) {
            this.favoriteClinics = favoriteClinics;
        }
    }

    public static class AuthResponse {
        private String token;
        private String email;
        private String nombre;
        private List<String> roles;
        private Long id;
        private String fotoUrl;

        public AuthResponse() {
        }

        public AuthResponse(String token, String email, String nombre, List<String> roles, Long id, String fotoUrl) {
            this.token = token;
            this.email = email;
            this.nombre = nombre;
            this.roles = roles;
            this.id = id;
            this.fotoUrl = fotoUrl;
        }

        // Builder pattern for Response
        public static AuthResponseBuilder builder() {
            return new AuthResponseBuilder();
        }

        public static class AuthResponseBuilder {
            private String token;
            private String email;
            private String nombre;
            private List<String> roles;
            private Long id;
            private String fotoUrl;

            public AuthResponseBuilder token(String token) {
                this.token = token;
                return this;
            }

            public AuthResponseBuilder email(String email) {
                this.email = email;
                return this;
            }

            public AuthResponseBuilder nombre(String nombre) {
                this.nombre = nombre;
                return this;
            }

            public AuthResponseBuilder roles(List<String> roles) {
                this.roles = roles;
                return this;
            }

            public AuthResponseBuilder id(Long id) {
                this.id = id;
                return this;
            }

            public AuthResponseBuilder fotoUrl(String fotoUrl) {
                this.fotoUrl = fotoUrl;
                return this;
            }

            public AuthResponse build() {
                return new AuthResponse(token, email, nombre, roles, id, fotoUrl);
            }
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getNombre() {
            return nombre;
        }

        public void setNombre(String nombre) {
            this.nombre = nombre;
        }

        public List<String> getRoles() {
            return roles;
        }

        public void setRoles(List<String> roles) {
            this.roles = roles;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getFotoUrl() {
            return fotoUrl;
        }

        public void setFotoUrl(String fotoUrl) {
            this.fotoUrl = fotoUrl;
        }
    }
}
