package com.adrigm.petconnectbackend.features.user;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
    private String nombre;
    private String apellidos;
    private String dni;
    private String telefono;
    private String fotoUrl;
    private String direccion;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> interests = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<Long> favoriteClinics = new ArrayList<>();

    public User() {
    }

    public User(Long id, String email, String password, String nombre, String apellidos, String dni, String telefono,
            String fotoUrl, String direccion, List<String> roles, List<String> interests, List<Long> favoriteClinics) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dni = dni;
        this.telefono = telefono;
        this.fotoUrl = fotoUrl;
        this.direccion = direccion;
        this.roles = roles;
        this.interests = interests;
        this.favoriteClinics = favoriteClinics;
    }

    // Builder Pattern manually
    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private Long id;
        private String email;
        private String password;
        private String nombre;
        private String apellidos;
        private String dni;
        private String telefono;
        private String fotoUrl;

        private String direccion;
        private List<String> roles = new ArrayList<>();
        private List<String> interests = new ArrayList<>();
        private List<Long> favoriteClinics = new ArrayList<>();

        public UserBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public UserBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserBuilder password(String password) {
            this.password = password;
            return this;
        }

        public UserBuilder nombre(String nombre) {
            this.nombre = nombre;
            return this;
        }

        public UserBuilder apellidos(String apellidos) {
            this.apellidos = apellidos;
            return this;
        }

        public UserBuilder dni(String dni) {
            this.dni = dni;
            return this;
        }

        public UserBuilder telefono(String telefono) {
            this.telefono = telefono;
            return this;
        }

        public UserBuilder fotoUrl(String fotoUrl) {
            this.fotoUrl = fotoUrl;
            return this;
        }

        public UserBuilder direccion(String direccion) {
            this.direccion = direccion;
            return this;
        }

        public UserBuilder roles(List<String> roles) {
            this.roles = roles;
            return this;
        }

        public UserBuilder interests(List<String> interests) {
            this.interests = interests;
            return this;
        }

        public UserBuilder favoriteClinics(List<Long> favoriteClinics) {
            this.favoriteClinics = favoriteClinics;
            return this;
        }

        public User build() {
            return new User(id, email, password, nombre, apellidos, dni, telefono, fotoUrl, direccion, roles, interests,
                    favoriteClinics);
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getFotoUrl() {
        return fotoUrl;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
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
