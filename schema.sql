CREATE TABLE users(
  user_id INT NOT NULL AUTO_INCREMENT,
  username CHAR(24) NOT NULL,
  hash BINARY(60) NOT NULL,
  PRIMARY KEY ( user_id )
);