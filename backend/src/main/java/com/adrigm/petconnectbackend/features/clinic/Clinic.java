package com.adrigm.petconnectbackend.features.clinic;

import jakarta.persistence.*;

@Entity
@Table(name = "clinics")
public class Clinic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private Double latitud;
    private Double longitud;
    private Boolean esUrgencia24h;
    private String telefono;
    private String direccion;
    private String horario;

    public Clinic() {
    }

    public Clinic(Long id, String nombre, Double latitud, Double longitud, Boolean esUrgencia24h, String telefono,
            String direccion, String horario) {
        this.id = id;
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
        this.esUrgencia24h = esUrgencia24h;
        this.telefono = telefono;
        this.direccion = direccion;
        this.horario = horario;
    }

    public static ClinicBuilder builder() {
        return new ClinicBuilder();
    }

    public static class ClinicBuilder {
        private Long id;
        private String nombre;
        private Double latitud;
        private Double longitud;
        private Boolean esUrgencia24h;
        private String telefono;
        private String direccion;
        private String horario;

        public ClinicBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public ClinicBuilder nombre(String nombre) {
            this.nombre = nombre;
            return this;
        }

        public ClinicBuilder latitud(Double latitud) {
            this.latitud = latitud;
            return this;
        }

        public ClinicBuilder longitud(Double longitud) {
            this.longitud = longitud;
            return this;
        }

        public ClinicBuilder esUrgencia24h(Boolean esUrgencia24h) {
            this.esUrgencia24h = esUrgencia24h;
            return this;
        }

        public ClinicBuilder telefono(String telefono) {
            this.telefono = telefono;
            return this;
        }

        public ClinicBuilder direccion(String direccion) {
            this.direccion = direccion;
            return this;
        }

        public ClinicBuilder horario(String horario) {
            this.horario = horario;
            return this;
        }

        public Clinic build() {
            return new Clinic(id, nombre, latitud, longitud, esUrgencia24h, telefono, direccion, horario);
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getLatitud() {
        return latitud;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public Boolean getEsUrgencia24h() {
        return esUrgencia24h;
    }

    public void setEsUrgencia24h(Boolean esUrgencia24h) {
        this.esUrgencia24h = esUrgencia24h;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }
}
