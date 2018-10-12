package com.capgemini.caplab.pulssjekk.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class PollAnswerId {
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "poll_message_id")
    private Long pollMessageId;
}
