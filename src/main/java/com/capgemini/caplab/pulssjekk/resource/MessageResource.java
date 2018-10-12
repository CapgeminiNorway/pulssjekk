package com.capgemini.caplab.pulssjekk.resource;
import com.capgemini.caplab.pulssjekk.model.Message;
import com.capgemini.caplab.pulssjekk.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping(value="/api/v1/messages")
public class MessageResource {


    @Autowired
    MessageRepository messageRepository;


    @GetMapping(value = "/all")
    public List<Message> getAll() {
        return messageRepository.findAll();
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json")
    public Message getObjectActionStatus(@PathVariable ("id") Long id) {
        Message ref =  messageRepository.getOne(id);
        return new Message(ref.getId(), ref.getContent());
    }

    @PostMapping(value = "/")
    public Message persist(@RequestBody final Message message){
        return messageRepository.save(message);
    }
}
