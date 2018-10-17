package com.capgemini.caplab.pulssjekk.resource;


import com.capgemini.caplab.pulssjekk.model.User;
import com.capgemini.caplab.pulssjekk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/v1/users")
public class UserResource {

    @Autowired
    UserRepository userRepository;

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getOne(@PathVariable("id") Long id) {
        Optional<User> ref = userRepository.findById(id);
        return ResponseEntity.of(ref);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> save(@RequestBody final User user) throws URISyntaxException {
        User body = userRepository.save(user);

        return ResponseEntity.created(new URI("/api/v1/users/" + user.getId()))
                .contentType(MediaType.APPLICATION_JSON)
                .body(body);
    }

}

