const db = require("../helpers/db.helper");

exports.readAllMovies = (filter, callback) => {
  const sql = `SELECT * FROM movies WHERE "title" LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`;
  const values = [`%${filter.search}%`, filter.limit, filter.offset];
  db.query(sql, values, callback);
};

exports.readCountAllMovies = (filter, callback) => {
  const sql = `SELECT COUNT("title") AS "totalData" FROM movies WHERE "title" LIKE $1`;
  const values = [`%${filter.search}%`];
  db.query(sql, values, callback);
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
