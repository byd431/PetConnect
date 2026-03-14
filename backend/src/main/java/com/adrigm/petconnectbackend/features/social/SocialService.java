package com.adrigm.petconnectbackend.features.social;

import com.adrigm.petconnectbackend.features.user.User;
import com.adrigm.petconnectbackend.features.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SocialService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Post> getFeed() {
        return postRepository.findAllByOrderByFechaDesc();
    }

    public Post createPost(Post post, String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        post.setAutor(user);
        post.setFecha(LocalDateTime.now());
        return postRepository.save(post);
    }
}
