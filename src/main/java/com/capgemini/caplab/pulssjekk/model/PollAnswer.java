package com.capgemini.caplab.pulssjekk.model;


import javax.persistence.*;
/*
@Entity
@Table(name="pollAnswer")

*/
public class PollAnswer {

    User user;
    PollMessage pollMessage;
/*

    @EmbeddedId
    private PollAnswerId id;

    @OneToMany(cascade=CascadeType.ALL, mappedBy="pollAnswer")
    @JoinColumn(name = "user_id")
    public User getUser(){
        return user;
    }

    @OneToMany(cascade=CascadeType.ALL, mappedBy="pollAnswer")
    @JoinColumn(name = "user_id")
    public PollMessage getPollMessage(){
        return pollMessage;
    }

    @OneToMany(fetch = FetchType.LAZY, targetEntity=PollOption.class, cascade=CascadeType.ALL)
    @JoinColumn(name = "poll_option_id", nullable = false)
    private PollOption pollOption;

*/
}
