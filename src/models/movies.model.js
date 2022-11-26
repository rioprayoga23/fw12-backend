const db = require("../helpers/db.helper");

exports.getAllMovies = (callback) => {
  const sql = "SELECT * FROM movies";
  db.query(sql, callback);
};

exports.createMovie = (data, callback) => {
  const { title, picture, releaseDate, director, duration, synopsis } = data;
  const sql =
    'INSERT INTO movies ("title","picture","releaseDate","director","duration","synopsis") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';

  const values = [title, picture, releaseDate, director, duration, synopsis];
  return db.query(sql, values, callback);
};

exports.readMovie = (id, callback) => {
  const sql = "SELECT * FROM movies WHERE id = $1";
  const values = [id];
  db.query(sql, values, callback);
};

exports.updateMovie = (data, id, callback) => {
  const { title, picture, releaseDate, director, duration, synopsis } = data;

  const sql = `UPDATE movies SET "title" =COALESCE(NULLIF($1, ''), "title"), "picture" =COALESCE(NULLIF($2, ''), "picture"),"releaseDate" =COALESCE(NULLIF($3, '')::TIMESTAMP, "releaseDate"),"director" =COALESCE(NULLIF($4, ''), "director"),"duration" =COALESCE(NULLIF($5, '')::TIME, "duration"),"synopsis" =COALESCE(NULLIF($6, ''), "synopsis"), "updatedAt"= $7 WHERE id =$8 RETURNING *`;

  const values = [
    title,
    picture,
    releaseDate,
    director,
    duration,
    synopsis,
    new Date(),
    id,
  ];

  db.query(sql, values, callback);
};

exports.deleteMovie = (id, callback) => {
  const sql = "DELETE FROM movies WHERE id = $1 RETURNING *";
  const values = [id];
  db.query(sql, values, callback);
};
