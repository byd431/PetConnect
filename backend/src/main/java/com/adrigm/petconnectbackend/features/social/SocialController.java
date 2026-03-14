package com.adrigm.petconnectbackend.features.social;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class SocialController {

    @Autowired
    private SocialService socialService;

    @GetMapping
    public ResponseEntity<List<Post>> getFeed() {
        return ResponseEntity.ok(socialService.getFeed());
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post, Principal principal) {
        return ResponseEntity.ok(socialService.createPost(post, principal.getName()));
    }
}
