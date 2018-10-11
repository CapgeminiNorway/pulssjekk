package com.capgemini.caplab.pulssjekk.model;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email")
    private String email;

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }
}