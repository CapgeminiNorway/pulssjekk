package com.capgemini.caplab.pulssjekk.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "answer")
@Entity
public class Answer {

    @EmbeddedId
    private AnswerId answerId;

    @Column(name = "text")
    private String text;

    public AnswerId getAnswerId() {
        return answerId;
    }

    public void setAnswerId(AnswerId answerId) {
        this.answerId = answerId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

}
