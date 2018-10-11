package com.capgemini.caplab.pulssjekk.repository;


import com.capgemini.caplab.pulssjekk.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
