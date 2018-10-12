package com.capgemini.caplab.pulssjekk.resource;
import com.capgemini.caplab.pulssjekk.model.PollMessage;
import com.capgemini.caplab.pulssjekk.repository.PollMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping(value="/api/v1/messages")
public class PollMessageResource {


    @Autowired
    PollMessageRepository pollMessageRepository;


    @GetMapping(value = "/all")
    public List<PollMessage> getAll() {
        return pollMessageRepository.findAll();
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json")
    public PollMessage getObjectActionStatus(@PathVariable ("id") Long id) {
        PollMessage ref =  pollMessageRepository.getOne(id);
        return new PollMessage(ref.getId(), ref.getContent());
    }

    @PostMapping(value = "/")
    public PollMessage persist(@RequestBody final PollMessage message){
        return pollMessageRepository.save(message);
    }
}