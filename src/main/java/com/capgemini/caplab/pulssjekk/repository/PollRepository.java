package com.capgemini.caplab.pulssjekk.repository;


import com.capgemini.caplab.pulssjekk.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PollRepository extends JpaRepository<Poll, Long> {

    @Query(value = "select p from Poll p where p.createdBy = ?1")
    List<Poll> findAllByUser(String username);

}