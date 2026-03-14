package com.adrigm.petconnectbackend.features.emergency;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergency")
public class EmergencyController {

    private final EmergencyService emergencyService;

    public EmergencyController(EmergencyService emergencyService) {
        this.emergencyService = emergencyService;
    }

    @PostMapping
    public ResponseEntity<EmergencyEvent> triggerSOS(@RequestParam Long userId, @RequestParam Long petId,
            @RequestParam Double lat, @RequestParam Double lon) {
        return ResponseEntity.ok(emergencyService.createEmergency(userId, petId, lat, lon));
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<EmergencyEvent>> getHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(emergencyService.getHistory(userId));
    }
}
