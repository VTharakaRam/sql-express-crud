-- {
-- show tables;

-- to run this type 
-- mysql -u root -p
-- then it will ask your password
-- then go to respective db
-- and run the file with the command 
-- source file.sql

-- }


create table user(
    id varchar(50) primary key,
    username varchar(50) unique,
    email varchar(50) unique not null,
    password varchar(50) not null
);

show tables;