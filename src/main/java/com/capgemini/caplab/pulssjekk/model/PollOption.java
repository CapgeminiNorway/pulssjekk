package com.capgemini.caplab.pulssjekk.model;

import org.hibernate.annotations.OnDelete;

import javax.persistence.*;

@Entity
@Table(name="pollOption")
public class PollOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
/*
    @ManyToOne(fetch = FetchType.LAZY, targetEntity=PollMessage.class, cascade=CascadeType.ALL)
    @JoinColumn(name = "pollMessageId", nullable = false)
    private PollMessage pollMessage;

    */

    @Column(name = "content")
    private String content;


    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }
}
