CREATE DATABASE guitar_db;
USE guitar_db;

CREATE TABLE guitarists
(
	id int NOT NULL AUTO_INCREMENT,
	position int NOT NULL,
	guitarist varchar(255) NOT NULL,
	genre varchar (50),
	PRIMARY KEY (id)
);