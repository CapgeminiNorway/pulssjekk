package com.capgemini.caplab.pulssjekk.resource;


import com.capgemini.caplab.pulssjekk.model.User;
import com.capgemini.caplab.pulssjekk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/api/v1/users")
public class UserResource {


    @Autowired
    UserRepository userRepository;


    @GetMapping(value = "/all")
    public List<User> getAll() {
        return userRepository.findAll();
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json")
    public User getObjectActionStatus(@PathVariable("id") Long id) {
        User ref =  userRepository.getOne(id);
        return new User(ref.getId(), ref.getEmail());
    }

    @PostMapping(value = "/")
    public User persist(@RequestBody final User user){
        return userRepository.save(user);
    }
}

