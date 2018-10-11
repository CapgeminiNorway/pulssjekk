package com.capgemini.caplab.pulssjekk.repository;

import com.capgemini.caplab.pulssjekk.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
