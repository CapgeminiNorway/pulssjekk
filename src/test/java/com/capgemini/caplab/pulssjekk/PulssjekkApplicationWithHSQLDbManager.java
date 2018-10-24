package com.capgemini.caplab.pulssjekk;

import org.hsqldb.util.DatabaseManagerSwing;

public class PulssjekkApplicationWithHSQLDbManager {

    public static void main(String[] args) {
        DatabaseManagerSwing.main(new String[]{"--url", "jdbc:hsqldb:mem:testdb", "--user", "testuser", "--password", ""});
        PulssjekkApplication.main(new String[]{"--debug"});
        //setupTestDb();
    }
/*

    private static void setupTestDb() {
        try (Connection connection = DriverManager.getConnection("jdbc:hsqldb:mem:testdb", "testuser", "")) {
            Statement statement = connection.createStatement();

            statement.execute("insert into users(username, password, enabled) values ('user', '$2a$10$jCDZ/DxVN5yMErKmcbIWwezhhi5KNIyJlwZQ/YjK3iA1fLQ5taYFa', true)");
            statement.execute("insert into users(username, password, enabled) values ('admin', '$2a$10$h1eUdAWiinqjxytLJ93RjOrBgM1wcT5K5UffK4PWNtzx9v9eV6Nua', true)");
            statement.execute("insert into authorities(username, authority) values ('user', 'USER')");
            statement.execute("insert into authorities(username, authority) values ('admin', 'ADMIN')");

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

*/
}
