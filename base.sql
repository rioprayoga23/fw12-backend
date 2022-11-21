-- Active: 1669025233004@@127.0.0.1@5432@tiketku@public
-- Active: 1669010052102@@127.0.0.1@5432@go_nobar@public

--CREATE DATABASE
-- CREATE DATABASE tiketku;


CREATE TABLE "users" (
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "image" VARCHAR(225),
    "firstName" VARCHAR(225),
    "lastName" VARCHAR(225),
    "phoneNumber" VARCHAR(225),
    "email" VARCHAR(225),
    "password" VARCHAR(225),
    "isAdmin" BOOLEAN NULL DEFAULT false,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);

CREATE TABLE "forgotPassword"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "idUser" INT,
    "code" VARCHAR(225),
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);

CREATE TABLE "movies"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "title" VARCHAR(225),
    "image" VARCHAR(225),
    "releaseDate" TIMESTAMP,
    "director" VARCHAR(225),
    "duration" TIME,
    "synopsis" TEXT,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);
CREATE TABLE "genre"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(225),
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);
CREATE TABLE "movieGenre"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "idMovie" INT,
    "idGenre" INT,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);
CREATE TABLE "casts"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(225),
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);
CREATE TABLE "movieCast"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "idMovie" INT,
    "idCast" INT,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);
CREATE TABLE "cinemas"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "image" VARCHAR(225),
    "name" VARCHAR(225),
    "address" VARCHAR(225),
    "city" VARCHAR(225),
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);
CREATE TABLE "movieSchedules"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "idMovie" INT,
    "idCinema" INT,
    "price" BIGINT,
    "startDate" TIMESTAMP,
    "endDate" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);
CREATE TABLE "movieScheduleTimes"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "time" TIME,
    "idMovieSchedule" INT,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);
CREATE TABLE "status"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(225),
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);
CREATE TABLE "transactions"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "bookingDate" TIMESTAMP,
    "idMovie" INT,
    "idCinema" INT,
    "idMovieSchedule" INT,
    "fullName" VARCHAR(225),
    "email" VARCHAR(225),
    "phoneNumber" VARCHAR(225),
    "idStatus" INT,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);
CREATE TABLE "reservedSeat"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "seatNum" VARCHAR(225),
    "idTransaction" INT,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);

CREATE TABLE "paymentMethod"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "image" VARCHAR(225),
    "name" VARCHAR(225),
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);

CREATE TABLE "subscribers"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email" VARCHAR(225),
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);


-- * users
SELECT * FROM users;

INSERT INTO users (image,"firstName","lastName","phoneNumber",email,password,"isAdmin") 
VALUES ('https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg','admin','ganteng','089890890890','admin@gmail.com','admin123',true);

INSERT INTO users (image,"firstName","lastName","phoneNumber",email,"password") 
VALUES ('https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg','rio','prayoga','085785667890','rio@gmail.com','rio123');

-- * end users

-- *forgotPassword
SELECT * FROM "forgotPassword";

INSERT INTO "forgotPassword" ("idUser",code)
VALUES (2,'45678');

INSERT INTO "forgotPassword" ("idUser",code)
VALUES (2,'56789');

-- *end forgotPassword

-- *movies
SELECT * FROM movies;
INSERT INTO movies (title,image,"releaseDate",director,duration,synopsis)
VALUES ('Spiderman','https:://spiderman.jpg','2018-01-01 00:00:01','jhon doe','02:15:00','Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, placeat ratione. Aut eveniet, sapiente iusto odio nesciunt odit magni ducimus');
-- *end movies

-- *cast
SELECT * FROM casts;

INSERT INTO casts (name) VALUES ('Tom Holand');
INSERT INTO casts (name) VALUES ('Joe Taslim');
-- *end cast


-- *movie cast
SELECT * FROM "movieCast";

INSERT INTO "movieCast" ("idMovie","idCast") VALUES (1,1);
INSERT INTO "movieCast" ("idMovie","idCast") VALUES (1,2);
-- *end movie cast

-- * genre
SELECT * FROM genre;

INSERT INTO genre(name) VALUES ('action');
INSERT INTO genre(name) VALUES ('adventure');

-- *end genre

-- *movieGenre
SELECT * FROM "movieGenre";

INSERT INTO "movieGenre" ("idMovie","idGenre") VALUES (1,1);
INSERT INTO "movieGenre" ("idMovie","idGenre") VALUES (1,2);

-- *end movieGenre

-- *cinemas
SELECT * FROM cinemas;

INSERT INTO cinemas(image,name,address,city) 
VALUES ('https:://cinema21.jpg', 'Cinema 21', 'Jawa Barat','Bandung');

-- *end cinemas

-- *movieSchedule
SELECT * FROM "movieSchedules";
INSERT INTO "movieSchedules" ("idMovie","idCinema",price,"startDate","endDate") 
VALUES (1,1,35000,'2018-01-01 00:00:01','2018-03-01 00:00:01');
-- *end movieSchedule

-- *movieScheduleTimes

SELECT * FROM "movieScheduleTimes";

INSERT INTO "movieScheduleTimes"(time,"idMovieSchedule") 
VALUES ('14:00:00',1);

-- *end movieScheduleTimes

--*status
SELECT * FROM status;

INSERT INTO status(name) VALUES ('active');

--*end status

-- *transactions
SELECT * FROM transactions;

INSERT INTO transactions ("bookingDate","idMovie","idCinema","idMovieSchedule","fullName",email,"phoneNumber","idStatus") VALUES ('2018-01-01 00:00:01',1,1,1,'rio prayoga','rio@gmail.com','089789765789',1);

-- *end transactions

--* resevedSeat 
SELECT * FROM "reservedSeat";
INSERT INTO "reservedSeat"("seatNum","idTransaction") VALUES ('A1',1);
--*end resevedSeat 

--*paymentMethod
SELECT * FROM "paymentMethod";

INSERT INTO "paymentMethod" (image,name) VALUES ('gopay.jpg','gopay');
--*end paymentMethod

--* subscibers 
SELECT * FROM subscribers;

INSERT INTO subscribers (email) VALUES ('rio@gmail.com');
--* end subscibers 
