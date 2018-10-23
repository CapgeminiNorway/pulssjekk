package com.capgemini.caplab.pulssjekk;

import com.capgemini.caplab.pulssjekk.model.Poll;
import com.capgemini.caplab.pulssjekk.repository.PollRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertFalse;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser
public class PollResourceTest {

    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PollRepository pollRepository;

    @After
    public void cleanup() {
        pollRepository.deleteAll();
    }

    @Test
    public void shouldBeAbleToPostPoll() throws Exception {
        Poll poll = new Poll();
        poll.setQuestion("How are you?");
        String json = objectMapper.writeValueAsString(poll);
        this.mockMvc.perform(post("/api/v1/polls")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(header().exists("Location"))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    public void shouldBeAbleToGetPoll() throws Exception {
        Poll poll = new Poll();
        poll.setQuestion("Are you OK?");
        Poll saved = pollRepository.save(poll);

        String json = this.mockMvc.perform(get("/api/v1/polls/{id}", saved.getId()))
                .andExpect(status().isOk())
                .andExpect(header().string("Content-Type", containsString("application/json")))
                .andDo(print())
                .andReturn().getResponse().getContentAsString();

        Poll returned = objectMapper.readValue(json, Poll.class);

        assertEquals(saved.getId(), returned.getId());
        assertEquals(saved.getQuestion(), returned.getQuestion());
    }

    @Test
    public void shouldBeAbleToPutPoll() throws Exception {
        Poll poll = new Poll();
        poll.setQuestion("Are you OK?");
        final Long id = pollRepository.save(poll).getId();

        Poll toBeUpdated = new Poll();
        toBeUpdated.setId(id);
        toBeUpdated.setQuestion("Did you have a nice weekend?");

        String json = objectMapper.writeValueAsString(toBeUpdated);

        this.mockMvc.perform(put("/api/v1/polls/{id}", id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isNoContent())
                .andDo(print());

        Poll shouldBeUpdated = pollRepository.findById(id).get();

        assertEquals("Did you have a nice weekend?", shouldBeUpdated.getQuestion());
        assertEquals(id, shouldBeUpdated.getId());
    }

    @Test
    public void shouldBeAbleToDeletePoll() throws Exception {
        Poll poll = new Poll();
        poll.setQuestion("Are you OK?");
        final Long id = pollRepository.save(poll).getId();

        this.mockMvc.perform(delete("/api/v1/polls/{id}", id))
                .andExpect(status().isNoContent())
                .andDo(print());

        assertFalse(pollRepository.findById(id).isPresent());
    }

}
