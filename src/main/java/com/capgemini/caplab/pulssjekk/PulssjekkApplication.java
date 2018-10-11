package com.capgemini.caplab.pulssjekk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.capgemini.caplab.pulssjekk.repository")
@SpringBootApplication
public class PulssjekkApplication {

	public static void main(String[] args) {
		SpringApplication.run(PulssjekkApplication.class, args);
	}

}
