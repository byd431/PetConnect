package com.adrigm.petconnectbackend.features.social;

import com.adrigm.petconnectbackend.features.user.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User autor;

    private String titulo;

    @Column(length = 2000)
    private String contenido;

    @Enumerated(EnumType.STRING)
    private PostType tipo;

    private LocalDateTime fecha;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private java.util.List<Comment> comments = new java.util.ArrayList<>();

    public Post() {
    }

    public Post(Long id, User autor, String titulo, String contenido, PostType tipo, LocalDateTime fecha) {
        this.id = id;
        this.autor = autor;
        this.titulo = titulo;
        this.contenido = contenido;
        this.tipo = tipo;
        this.fecha = fecha;
    }

    public static PostBuilder builder() {
        return new PostBuilder();
    }

    public static class PostBuilder {
        private Long id;
        private User autor;
        private String titulo;
        private String contenido;
        private PostType tipo;
        private LocalDateTime fecha;

        public PostBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public PostBuilder autor(User autor) {
            this.autor = autor;
            return this;
        }

        public PostBuilder titulo(String titulo) {
            this.titulo = titulo;
            return this;
        }

        public PostBuilder contenido(String contenido) {
            this.contenido = contenido;
            return this;
        }

        public PostBuilder tipo(PostType tipo) {
            this.tipo = tipo;
            return this;
        }

        public PostBuilder fecha(LocalDateTime fecha) {
            this.fecha = fecha;
            return this;
        }

        public Post build() {
            return new Post(id, autor, titulo, contenido, tipo, fecha);
        }
    }

    // Getters and Setters
    public java.util.List<Comment> getComments() {
        return comments;
    }

    public void setComments(java.util.List<Comment> comments) {
        this.comments = comments;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getAutor() {
        return autor;
    }

    public void setAutor(User autor) {
        this.autor = autor;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public PostType getTipo() {
        return tipo;
    }

    public void setTipo(PostType tipo) {
        this.tipo = tipo;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
}
