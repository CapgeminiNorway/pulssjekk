package com.capgemini.caplab.pulssjekk.resource;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/usercontext")
public class UserContextResource {

    @GetMapping
    public UserContext getCurrentlyLoggedIn(Authentication authentication) {
        UserContext ret = new UserContext();

        ret.setUsername(authentication.getName());
        ret.setRoles(authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority).collect(Collectors.toList()));

        return ret;
    }

}
