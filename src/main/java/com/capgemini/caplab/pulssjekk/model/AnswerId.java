package com.capgemini.caplab.pulssjekk.model;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class AnswerId implements Serializable {

    @Column(name = "answered_by")
    private String answeredBy;

    @Column(name = "poll_id")
    private Long pollId;

    public String getAnsweredBy() {
        return answeredBy;
    }

    public void setAnsweredBy(String answeredBy) {
        this.answeredBy = answeredBy;
    }

    public Long getPollId() {
        return pollId;
    }

    public void setPollId(Long pollId) {
        this.pollId = pollId;
    }
}
