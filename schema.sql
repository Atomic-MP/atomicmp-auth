CREATE TABLE users(
	user_id 	serial  PRIMARY KEY,
	username 	varchar(24) NOT NULL,
	hash 		bytea(60),
	role 		integer DEFAULT 1,
	faction 	integer DEFAULT 0
);