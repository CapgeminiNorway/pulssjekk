insert into users(username, password, enabled) values ('user', '$2a$10$jCDZ/DxVN5yMErKmcbIWwezhhi5KNIyJlwZQ/YjK3iA1fLQ5taYFa', true)
insert into users(username, password, enabled) values ('admin', '$2a$10$h1eUdAWiinqjxytLJ93RjOrBgM1wcT5K5UffK4PWNtzx9v9eV6Nua', true)
insert into authorities(username, authority) values ('user', 'USER')
insert into authorities(username, authority) values ('admin', 'ADMIN')