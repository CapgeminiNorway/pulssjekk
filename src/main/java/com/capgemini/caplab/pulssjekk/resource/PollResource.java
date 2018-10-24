package com.capgemini.caplab.pulssjekk.resource;

import com.capgemini.caplab.pulssjekk.model.Poll;
import com.capgemini.caplab.pulssjekk.repository.PollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/v1/polls")
public class PollResource {

    @Autowired
    PollRepository pollRepository;

    @GetMapping
    public List<Poll> findAll() {
        return pollRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public Poll findById(@PathVariable Long id) {
        Optional<Poll> poll = pollRepository.findById(id);
        return poll
                .orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Can't find poll with id " + id));
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Poll poll, Authentication authentication) {
        System.out.println(authentication);
        poll.setCreatedBy(authentication.getName());

        Poll saved = pollRepository.save(poll);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getId()).toUri();
        return ResponseEntity.created(location).body(saved);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        pollRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<?> update(@RequestBody Poll poll, @PathVariable Long id) {
        if(!pollRepository.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        poll.setId(id);
        pollRepository.save(poll);
        return ResponseEntity.noContent().build();
    }

}