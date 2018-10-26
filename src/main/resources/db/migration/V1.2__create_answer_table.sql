create table answer (
  text VARCHAR (256) NOT NULL,
  answered_by varchar(50) not null,
  poll_id INTEGER NOT NULL,
  constraint fk_answer_users foreign key(answered_by) references users(username),
  constraint fk_answer_poll foreign key(poll_id) references poll(id),
  primary key(poll_id, answered_by)
);