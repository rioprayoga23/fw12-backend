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
    "createdAt" TIMESTAMPZ DEFAULT now(),
    "updatedAt" TIMESTAMPZ 
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
    "userId" INT,
    "bookingDate" TIMESTAMP,
    "movieId" INT,
    "cinemaId" INT,
    "movieScheduleId" INT,
    "reservedSeatId" INT,
    "fullName" VARCHAR(225),
    "email" VARCHAR(225),
    "phoneNumber" VARCHAR(225),
    "paymentMethodId" INT,
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
VALUES ('Harry Potter',null,'2022-12-23','','02:15:00','Harry Potter and the Philosopher’s Stone, also called Harry Potter and the Sorcerer’s Stone, the first novel in the immensely popular Harry Potter series by British writer J.K. Rowling. It was first published in Britain in 1997 and appeared in the United States the following year under the title Harry Potter and the Sorcerer’s Stone. The book’s imaginative story line about a boy wizard made it an enduring hit with both children and adults');

INSERT INTO movies (title,picture,"releaseDate",director,duration,synopsis)
VALUES ('Fast and Fourius',null,'2022-12-20','Justin lin','02:15:00','The Fast and the Furious adalah sebuah seri film aksi, yang berpusat balapan jalanan liar dan perampokan. Didistribusikan oleh Universal Pictures, seri ini dimulai dengan film tahun 2001 berjudul The Fast dan Furious; diikuti oleh tujuh sekuel dan dua film pendek');

INSERT INTO movies (title,picture,"releaseDate",director,duration,synopsis)
VALUES ('Marvel End Game',null,'2022-12-15','Joe Russo','02:15:00','Melanjutkan Avengers Infinity War, dimana kejadian setelah Thanos berhasil mendapatkan semua infinity stones dan memusnahkan 50% semua mahluk hidup di alam semesta. Akankah para Avengers berhasil mengalahkan Thanos?');
-- *end movies

INSERT INTO movies (title,picture,"releaseDate",director,duration,synopsis)
VALUES ('Thor Love Thunder',null,'2022-12-12','Joe Russo','02:15:00','Ketika Thor yang arogan mengacaukan gencatan senjata antara Asgardians dan Giants Frost, Odin sang raja Asgard membuangnya ke bumi. Kini, Thor harus membuktikan bahwa dirinya layak atas takdirnya.');

INSERT INTO movies (title,picture,"releaseDate",director,duration,synopsis)
VALUES ('The end of F***ing World',null,'2022-12-11','Justin','01:15:00','Serial ini bercerita tentang James (Alex Lawther), seorang remaja berusia 17 tahun yang mempercayai dirinya sebagai seorang psikopat dan seorang remaja sosiopat bernama Alyssa (Jessica Barden), teman sekelas James, seorang pemberontak.');

INSERT INTO movies (title,picture,"releaseDate",director,duration,synopsis)
VALUES ('The end of F***ing World Season 2',null,'2022-12-30','Justin','01:15:00','Serial ini bercerita tentang James (Alex Lawther), seorang remaja berusia 17 tahun yang mempercayai dirinya sebagai seorang psikopat dan seorang remaja sosiopat bernama Alyssa (Jessica Barden), teman sekelas James, seorang pemberontak.');

INSERT INTO movies (title,picture,"releaseDate",director,duration,synopsis)
VALUES ('Captain America',null,'2022-12-30','Joe Jhonston','01:15:00','Steve Rogers, ditolak masuk militer karena tidak layak. Kecewa, ia kemudian menjadi relawan untuk sebuah program rahasia, yang membuatnya menjelma menjadi seorang prajurit luar biasa, Captain America.');

INSERT INTO movies (title,picture,"releaseDate",director,duration,synopsis)
VALUES ('Hulk',null,'2022-12-23','Joe Jhonston','01:15:00','Hulk, adalah tokoh pahlawan super fiksi yang ada pada Marvel Comics. DIciptakan oleh Stan Lee dan Jack Kirby, tokoh ini pertama kali muncul di The Incredible Hulk pada tanggal 1 Mei 1962 ');

INSERT INTO movies (title,picture,"releaseDate",director,duration,synopsis)
VALUES ('Avatar the way of water',null,'2022-12-29','James Cameroon','01:15:00','Seorang Marinir lumpuh dikirim ke bulan Pandora untuk menjalani misi khusus namun, ia justru dilema antara mengikuti perintah atau melindungi dunia baru yang iya rasakan seperti rumah.');
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

--! RELATION

ALTER TABLE "movieGenre"
ADD CONSTRAINT "fk_movieGenre_movieId"
FOREIGN KEY ("movieId") REFERENCES movies(id)
ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "movieGenre"
ADD CONSTRAINT "fk_movieGenre_genreId"
FOREIGN KEY ("genreId") REFERENCES genre(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieCast"
ADD CONSTRAINT "fk_movieCast_castId"
FOREIGN KEY ("castId") REFERENCES casts(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieCast"
ADD CONSTRAINT "fk_movieCast_movieId"
FOREIGN KEY ("movieId") REFERENCES movies(id)
ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "movieSchedules" 
ADD CONSTRAINT "fk_movieSchedule_cinemaId" 
FOREIGN KEY ("cinemaId") REFERENCES cinemas(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieSchedules" 
ADD CONSTRAINT "fk_movieSchedule_movieId" 
FOREIGN KEY ("movieId") REFERENCES movies(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieScheduleTimes" 
ADD CONSTRAINT "fk_movieSchedulesTimes_movieSchedules" 
FOREIGN KEY ("movieScheduleId") REFERENCES "movieSchedules"(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "transactions" 
ADD CONSTRAINT "fk_transactions_userId" 
FOREIGN KEY ("userId") REFERENCES "users"(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "transactions" 
ADD CONSTRAINT "fk_transactions_movieId" 
FOREIGN KEY ("movieId") REFERENCES "movies"(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "transactions" 
ADD CONSTRAINT "fk_transactions_cinemaId" 
FOREIGN KEY ("cinemaId") REFERENCES "cinemas"(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "transactions" 
ADD CONSTRAINT "fk_transactions_movieScheduleId" 
FOREIGN KEY ("movieScheduleId") REFERENCES "movieSchedules"(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "transactions" 
ADD CONSTRAINT "fk_transactions_statusId" 
FOREIGN KEY ("idStatus") REFERENCES "status"(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "transactions" 
ADD CONSTRAINT "fk_transactions_paymentMethodId" 
FOREIGN KEY ("paymentMethodId") REFERENCES "paymentMethod"(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "reservedSeat" 
ADD CONSTRAINT "fk_reservedSeat_transactionId" 
FOREIGN KEY ("transactionId") REFERENCES "transactions"(id) 
ON DELETE CASCADE ON UPDATE CASCADE;



--*ALTER COLUMN UNTUK TIMESTAMP
ALTER TABLE users
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ;

ALTER TABLE transactions
ALTER COLUMN "bookingDate" TYPE TIMESTAMPTZ,
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ;


ALTER TABLE subscribers
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ;

ALTER TABLE status
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ;

ALTER TABLE "reservedSeat"
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ;

ALTER TABLE "paymentMethod"
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ;

ALTER TABLE "movies"
ALTER COLUMN "releaseDate" TYPE DATE,
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ;

ALTER TABLE "movieSchedules"
ALTER COLUMN "startDate" TYPE TIMESTAMP,
ALTER COLUMN "endDate" TYPE TIMESTAMP,
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ;

ALTER TABLE "movieScheduleTimes"
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ;

ALTER TABLE "movieGenre"
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ;

ALTER TABLE "movieCast"
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ;

ALTER TABLE "genre"
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ;

ALTER TABLE "forgotPassword"
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ;

ALTER TABLE "cinemas"
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ;

ALTER TABLE "casts"
ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ;

--*ALTER COLUMN UNIQUE
ALTER TABLE subscribers ADD CONSTRAINT "UniqueEmailSubscribers" UNIQUE (email);

ALTER TABLE status ADD CONSTRAINT "UniqueNameStatus" UNIQUE (name);

ALTER TABLE genre ADD CONSTRAINT "UniqueNameGenre" UNIQUE (name);

ALTER TABLE users ADD CONSTRAINT "UniquePhoneNumberUsers" UNIQUE ("phoneNumber");

ALTER TABLE transactions
DROP COLUMN "reservedSeatId";

BEGIN;
INSERT INTO transactions ("userId","bookingDate","movieId","cinemaId","movieScheduleId","fullName",email,"phoneNumber","paymentMethodId","idStatus") VALUES (9,'1674371007',8,4,22,'rio prayoga','rio@gmail.com','089789765789',4,1);

INSERT INTO "reservedSeat" ("seatNum","transactionId") VALUES ('D4',currval(pg_get_serial_sequence('transactions','id')));
COMMIT;
