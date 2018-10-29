package com.capgemini.caplab.pulssjekk.resource;

import com.capgemini.caplab.pulssjekk.model.Answer;
import com.capgemini.caplab.pulssjekk.model.AnswerId;
import com.capgemini.caplab.pulssjekk.model.Poll;
import com.capgemini.caplab.pulssjekk.repository.AnswerRepository;
import com.capgemini.caplab.pulssjekk.repository.PollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/v1/polls")
public class PollResource {

    @Autowired
    PollRepository pollRepository;

    @Autowired
    AnswerRepository answerRepository;

    @GetMapping
    public List<Poll> findAll() {
        return pollRepository.findAll().stream().map(poll -> {
            poll.setAnswers(answerRepository.findByPoll(poll.getId()));
            return poll;
        }).collect(Collectors.toList());
    }

    @GetMapping("/unanswered")
    public List<Poll> getUnansweredByUser(Authentication authentication) {
        List<Poll> all = pollRepository.findAll();

        List<Poll> unanswered = new LinkedList<>();

        for(Poll p : all) {
            if(answerRepository.findByPoll(p.getId()).stream()
                    .noneMatch(answer -> answer.getAnswerId().getAnsweredBy().equals(authentication.getName()))) {
                unanswered.add(p);
            }
        }

        return unanswered;
    }

    @GetMapping(value = "/{id}")
    public Poll findById(@PathVariable Long id) {
        Optional<Poll> poll = pollRepository.findById(id);
        return poll
                .orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Can't find poll with id " + id));
    }


    @PostMapping
    public ResponseEntity<?> save(@RequestBody Poll poll, Authentication authentication) {
        poll.setCreatedBy(authentication.getName());
        Poll saved = pollRepository.save(poll);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getId()).toUri();
        return ResponseEntity.created(location).body(saved);
    }

    @PostMapping("/{pollId}/answers")
    public ResponseEntity<?> saveAnswer(@PathVariable Long pollId, @RequestBody String submittedAnswer, Authentication authentication) {
        AnswerId answerId = new AnswerId();
        answerId.setPollId(pollId);
        answerId.setAnsweredBy(authentication.getName());

        Answer answer = new Answer();
        answer.setText(submittedAnswer);
        answer.setAnswerId(answerId);

        answerRepository.save(answer);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        pollRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<?> update(@RequestBody Poll poll, @PathVariable Long id) {
        if (!pollRepository.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        poll.setId(id);
        pollRepository.save(poll);
        return ResponseEntity.noContent().build();
    }

}