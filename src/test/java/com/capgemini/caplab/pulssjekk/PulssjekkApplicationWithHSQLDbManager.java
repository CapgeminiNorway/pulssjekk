package com.capgemini.caplab.pulssjekk;

import org.hsqldb.util.DatabaseManagerSwing;

public class PulssjekkApplicationWithHSQLDbManager {

    public static void main(String[] args) {
        DatabaseManagerSwing.main(new String[]{"--url", "jdbc:hsqldb:mem:testdb", "--user", "testuser", "--password", ""});
        PulssjekkApplication.main(args);
    }
}
