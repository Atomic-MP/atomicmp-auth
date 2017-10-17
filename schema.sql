DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Roles
CREATE TABLE roles (
	role_id 	serial PRIMARY KEY,
	role_name 	varchar(20) NOT NULL
);

-- Hardcoded roles on initialization
INSERT INTO roles (role_name) VALUES ('banned');
INSERT INTO roles (role_name) VALUES ('kicked');
INSERT INTO roles (role_name) VALUES ('user');
INSERT INTO roles (role_name) VALUES ('moderator');
INSERT INTO roles (role_name) VALUES ('admin');

-- Factions. Update as needed.
CREATE TABLE factions (
	faction_id 		serial PRIMARY KEY,
	faction_name 	varchar(30) NOT NULL
);

-- :^)
INSERT INTO factions (faction_name) VALUES ('Sons Of Liberty');

-- User model. This will likely need to be added _last_ due to the nature of its references.
CREATE TABLE users(
	user_id 		serial  PRIMARY KEY,
	username 		varchar(24) NOT NULL unique,
	hash 			bytea NOT NULL,
	role 			integer REFERENCES roles(role_id) NOT NULL,
	faction 		integer REFERENCES factions(faction_id),
	created_at 		timestamp
);


CREATE TABLE keys(
	key_id 			serial PRIMARY KEY,
	key 			varchar(23) NOT NULL,
	owner 			integer REFERENCES users(user_id) ON DELETE CASCADE,
	created_by 		integer REFERENCES users(user_id)
);

