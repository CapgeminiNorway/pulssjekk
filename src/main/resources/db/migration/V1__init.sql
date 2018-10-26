create table users(
	username varchar(50) not null primary key,
	password varchar(100) not null,
	enabled boolean not null
);

create table authorities (
	username varchar(50) not null,
	authority varchar(50) not null,
	constraint fk_authorities_users foreign key(username) references users(username)
);

CREATE TABLE poll (
  id INTEGER NOT NULL IDENTITY,
  question VARCHAR (256) NOT NULL,
  created_by varchar(50) not null,
  constraint fk_poll_users foreign key(created_by) references users(username)
);

create unique index ix_auth_username on authorities (username,authority);