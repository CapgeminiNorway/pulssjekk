package com.capgemini.caplab.pulssjekk.repository;


import com.capgemini.caplab.pulssjekk.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PollRepository extends JpaRepository<Poll, Long> { }