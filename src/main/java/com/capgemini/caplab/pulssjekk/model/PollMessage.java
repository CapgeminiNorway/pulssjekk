package com.capgemini.caplab.pulssjekk.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="pollMessage")
public class PollMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="content")
    private String content;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = PollOption.class, cascade = CascadeType.ALL)
    private List<PollOption> pollOptions;


    public PollMessage() { }

    public PollMessage(Long id, String content) {
        this.id = id;
        this.content = content;
    }

    public Long getId() {
        return id;
    }


    public String getContent() {
        return content;
    }
}
