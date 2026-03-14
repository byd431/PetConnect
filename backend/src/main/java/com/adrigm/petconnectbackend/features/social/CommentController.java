package com.adrigm.petconnectbackend.features.social;

import com.adrigm.petconnectbackend.features.user.User;
import com.adrigm.petconnectbackend.features.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{postId}")
    public ResponseEntity<Comment> addComment(@PathVariable Long postId, @RequestBody String contenido,
            Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        Post post = postRepository.findById(postId).orElseThrow();

        Comment comment = new Comment(user, post, contenido, LocalDateTime.now());
        return ResponseEntity.ok(commentRepository.save(comment));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentRepository.findByPostId(postId));
    }
}
