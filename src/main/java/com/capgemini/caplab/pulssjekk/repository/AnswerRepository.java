package com.capgemini.caplab.pulssjekk.repository;

import com.capgemini.caplab.pulssjekk.model.Answer;
import com.capgemini.caplab.pulssjekk.model.AnswerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, AnswerId> {

    @Query(value = "select text, poll_id, answered_by from answer where poll_id = ?1",
            nativeQuery = true)
    public List<Answer> findByPoll(Long pollId);

}
