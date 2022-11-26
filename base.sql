-- Active: 1669095951493@@127.0.0.1@5432@tiketku@public
-- Active: 1669025233004@@127.0.0.1@5432@tiketku@public
-- Active: 1669010052102@@127.0.0.1@5432@go_nobar@public

--CREATE DATABASE
-- CREATE DATABASE tiketku;


CREATE TABLE "users" (
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture" VARCHAR(225),
    "firstName" VARCHAR(225),
    "lastName" VARCHAR(225),
    "phoneNumber" VARCHAR(225),
    "email" VARCHAR(225) UNIQUE,
    "password" VARCHAR(225),
    "isAdmin" BOOLEAN NULL DEFAULT false,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);

CREATE TABLE "forgotPassword"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "userId" INT,
    "code" VARCHAR(225),
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);

CREATE TABLE "movies"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "title" VARCHAR(225),
    "picture" VARCHAR(225),
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
    "movieId" INT,
    "genreId" INT,
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
    "movieId" INT,
    "castId" INT,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);
CREATE TABLE "cinemas"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture" VARCHAR(225),
    "name" VARCHAR(225),
    "address" VARCHAR(225),
    "city" VARCHAR(225),
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);
CREATE TABLE "movieSchedules"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "movieId" INT,
    "cinemaId" INT,
    "price" BIGINT,
    "startDate" TIMESTAMP,
    "endDate" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);
CREATE TABLE "movieScheduleTimes"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "time" TIME,
    "movieScheduleId" INT,
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
    "movieId" INT,
    "cinemaId" INT,
    "movieScheduleId" INT,
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
    "transactionId" INT,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP 
);

CREATE TABLE "paymentMethod"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture" VARCHAR(225),
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

INSERT INTO users (picture,"firstName","lastName","phoneNumber",email,password,"isAdmin") 
VALUES ('https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg','super','admin','089890890890','admin@gmail.com','admin123',true);

INSERT INTO users (picture,"firstName","lastName","phoneNumber",email,"password") 
VALUES ('https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg','rio','prayoga','085785667890','rio@gmail.com','rio123');

-- * end users

-- *forgotPassword
SELECT * FROM "forgotPassword";

INSERT INTO "forgotPassword" ("userId",code)
VALUES (2,'45678');

INSERT INTO "forgotPassword" ("userId",code)
VALUES (2,'56789');

-- *end forgotPassword

-- *movies
SELECT * FROM movies;
INSERT INTO movies (title,picture,"releaseDate",director,duration,synopsis)
VALUES ('Spiderman','https:://spiderman.jpg','1669100607','jhon doe','02:15:00','Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, placeat ratione. Aut eveniet, sapiente iusto odio nesciunt odit magni ducimus');
-- *end movies

-- *cast
SELECT * FROM casts;

INSERT INTO casts (name) VALUES ('Tom Holand');
INSERT INTO casts (name) VALUES ('Joe Taslim');
-- *end cast


-- *movie cast
SELECT * FROM "movieCast";

INSERT INTO "movieCast" ("movieId","castId") VALUES (1,1);
INSERT INTO "movieCast" ("movieId","castId") VALUES (1,2);
-- *end movie cast

-- * genre
SELECT * FROM genre;

INSERT INTO genre(name) VALUES ('action');
INSERT INTO genre(name) VALUES ('adventure');

-- *end genre

-- *movieGenre
SELECT * FROM "movieGenre";

INSERT INTO "movieGenre" ("movieId","genreId") VALUES (1,1);
INSERT INTO "movieGenre" ("movieId","genreId") VALUES (1,2);

-- *end movieGenre

-- *cinemas
SELECT * FROM cinemas;

INSERT INTO cinemas(picture,name,address,city) 
VALUES ('https:://cinema21.jpg', 'Cinema 21', 'Jawa Barat','Bandung');

-- *end cinemas

-- *movieSchedule
SELECT * FROM "movieSchedules";
INSERT INTO "movieSchedules" ("movieId","cinemaId",price,"startDate","endDate") 
VALUES (1,1,35000,'1669100607','1674371007');
-- *end movieSchedule

-- *movieScheduleTimes
SELECT * FROM "movieScheduleTimes";

INSERT INTO "movieScheduleTimes"(time,"movieScheduleId") 
VALUES ('14:00:00',1);

-- *end movieScheduleTimes

--*status
SELECT * FROM status;

INSERT INTO status(name) VALUES ('active');

--*end status

-- *transactions
SELECT * FROM transactions;

INSERT INTO transactions ("bookingDate","movieId","cinemaId","movieScheduleId","fullName",email,"phoneNumber","idStatus") VALUES ('1674371007',1,1,1,'rio prayoga','rio@gmail.com','089789765789',1);

-- *end transactions

--* resevedSeat 
SELECT * FROM "reservedSeat";
INSERT INTO "reservedSeat"("seatNum","transactionId") VALUES ('A1',1);
--*end resevedSeat 

--*paymentMethod
SELECT * FROM "paymentMethod";

INSERT INTO "paymentMethod" (picture,name) VALUES ('gopay.jpg','gopay');
--*end paymentMethod

--* subscibers 
SELECT * FROM subscribers;

INSERT INTO subscribers (email) VALUES ('rio@gmail.com');
--* end subscibers 