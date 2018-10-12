package com.capgemini.caplab.pulssjekk.repository;


import com.capgemini.caplab.pulssjekk.model.PollMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PollMessageRepository extends JpaRepository<PollMessage, Long> {

    PollMessage getOne(Long id);

}