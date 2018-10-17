package com.capgemini.caplab.pulssjekk;

import org.hsqldb.util.DatabaseManagerSwing;
import org.springframework.boot.SpringApplication;

public class PulssjekkApplicationTestRunner {

    public static void main(String[] args) {
        DatabaseManagerSwing.main(new String[] { "--url", "jdbc:hsqldb:mem:testdb", "--user", "testuser", "--password", "" });
        SpringApplication.run(PulssjekkApplication.class, args);
    }

}
