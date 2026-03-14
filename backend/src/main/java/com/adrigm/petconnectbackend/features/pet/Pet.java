package com.adrigm.petconnectbackend.features.pet;

import com.adrigm.petconnectbackend.features.user.User;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "pets")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;

    private String nombre;
    private String chip;

    @Enumerated(EnumType.STRING)
    private Species especie;

    private String raza;
    private String sexo;
    private String color;
    private Double peso;
    private LocalDate fechaNacimiento;
    private String fotoUrl;

    @Column(length = 1000)
    private String observaciones;

    public Pet() {
    }

    public Pet(Long id, User owner, String nombre, String chip, Species especie, String raza, String sexo, String color,
            Double peso, LocalDate fechaNacimiento, String fotoUrl, String observaciones) {
        this.id = id;
        this.owner = owner;
        this.nombre = nombre;
        this.chip = chip;
        this.especie = especie;
        this.raza = raza;
        this.sexo = sexo;
        this.color = color;
        this.peso = peso;
        this.fechaNacimiento = fechaNacimiento;
        this.fotoUrl = fotoUrl;
        this.observaciones = observaciones;
    }

    public static PetBuilder builder() {
        return new PetBuilder();
    }

    public static class PetBuilder {
        private Long id;
        private User owner;
        private String nombre;
        private String chip;
        private Species especie;
        private String raza;
        private String sexo;
        private String color;
        private Double peso;
        private LocalDate fechaNacimiento;
        private String fotoUrl;
        private String observaciones;

        public PetBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public PetBuilder owner(User owner) {
            this.owner = owner;
            return this;
        }

        public PetBuilder nombre(String nombre) {
            this.nombre = nombre;
            return this;
        }

        public PetBuilder chip(String chip) {
            this.chip = chip;
            return this;
        }

        public PetBuilder especie(Species especie) {
            this.especie = especie;
            return this;
        }

        public PetBuilder raza(String raza) {
            this.raza = raza;
            return this;
        }

        public PetBuilder sexo(String sexo) {
            this.sexo = sexo;
            return this;
        }

        public PetBuilder color(String color) {
            this.color = color;
            return this;
        }

        public PetBuilder peso(Double peso) {
            this.peso = peso;
            return this;
        }

        public PetBuilder fechaNacimiento(LocalDate fechaNacimiento) {
            this.fechaNacimiento = fechaNacimiento;
            return this;
        }

        public PetBuilder fotoUrl(String fotoUrl) {
            this.fotoUrl = fotoUrl;
            return this;
        }

        public PetBuilder observaciones(String observaciones) {
            this.observaciones = observaciones;
            return this;
        }

        public Pet build() {
            return new Pet(id, owner, nombre, chip, especie, raza, sexo, color, peso, fechaNacimiento, fotoUrl,
                    observaciones);
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getChip() {
        return chip;
    }

    public void setChip(String chip) {
        this.chip = chip;
    }

    public Species getEspecie() {
        return especie;
    }

    public void setEspecie(Species especie) {
        this.especie = especie;
    }

    public String getRaza() {
        return raza;
    }

    public void setRaza(String raza) {
        this.raza = raza;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Double getPeso() {
        return peso;
    }

    public void setPeso(Double peso) {
        this.peso = peso;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}
