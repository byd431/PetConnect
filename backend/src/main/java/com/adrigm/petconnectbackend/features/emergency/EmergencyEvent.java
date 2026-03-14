package com.adrigm.petconnectbackend.features.emergency;

import com.adrigm.petconnectbackend.features.clinic.Clinic;
import com.adrigm.petconnectbackend.features.pet.Pet;
import com.adrigm.petconnectbackend.features.user.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "emergency_events")
public class EmergencyEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @ManyToOne
    @JoinColumn(name = "clinic_id")
    private Clinic clinic;

    private Double latitude;
    private Double longitude;

    private LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    private EmergencyStatus status;

    public EmergencyEvent() {
    }

    public EmergencyEvent(Pet pet, User owner, Clinic clinic, Double latitude, Double longitude,
            LocalDateTime timestamp, EmergencyStatus status) {
        this.pet = pet;
        this.owner = owner;
        this.clinic = clinic;
        this.latitude = latitude;
        this.longitude = longitude;
        this.timestamp = timestamp;
        this.status = status;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Clinic getClinic() {
        return clinic;
    }

    public void setClinic(Clinic clinic) {
        this.clinic = clinic;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public EmergencyStatus getStatus() {
        return status;
    }

    public void setStatus(EmergencyStatus status) {
        this.status = status;
    }
}
