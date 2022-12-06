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

  const sql = `UPDATE movies SET "title" =COALESCE(NULLIF($1, ''), "title"), "picture" =COALESCE(NULLIF($2, ''), "picture"),"releaseDate" =COALESCE(NULLIF($3, '')::TIMESTAMPTZ, "releaseDate"),"director" =COALESCE(NULLIF($4, ''), "director"),"duration" =COALESCE(NULLIF($5, '')::TIME, "duration"),"synopsis" =COALESCE(NULLIF($6, ''), "synopsis"), "updatedAt"= $7 WHERE id =$8 RETURNING *`;

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

exports.nowShowing = (filter, callback) => {
  const sql = `SELECT m.id, m.picture, m.title, string_agg(g.name,', ') AS genre, ms."startDate", ms."endDate", m."createdAt" FROM movies m JOIN "movieGenre" mg ON mg."movieId" = m.id JOIN genre g ON g.id = mg."genreId" JOIN "movieSchedules" ms ON ms."movieId" = m.id WHERE NOW() BETWEEN ms."startDate" AND ms."endDate" AND m.title LIKE $1 GROUP BY m.id, ms.id ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`;
  const values = [`%${filter.search}%`, filter.limit, filter.offset];

  db.query(sql, values, callback);
};

exports.countNowShowing = (filter, callback) => {
  const sql = `SELECT COUNT("title") AS "totalData" FROM movies m JOIN "movieSchedules" ms ON ms."movieId" = m.id WHERE NOW() BETWEEN ms."startDate" AND ms."endDate" AND m.title LIKE $1`;

  const values = [`%${filter.search}%`];
  db.query(sql, values, callback);
};

exports.upComing = (filter, callback) => {
  const sql = `SELECT m.id, m.picture, m.title, m."releaseDate", string_agg(g.name,', ') AS genre, m."createdAt" FROM movies m JOIN "movieGenre" mg ON mg."movieId" = m.id JOIN genre g ON g.id = mg."genreId" WHERE to_char("releaseDate", 'FMMonth') = $1 AND to_char("releaseDate", 'FMYYYY') = $2 AND m.title LIKE $3 GROUP BY m.id ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $4 OFFSET $5`;
  const values = [
    filter.month,
    filter.year,
    `%${filter.search}%`,
    filter.limit,
    filter.offset,
  ];
  db.query(sql, values, callback);
};

exports.countUpComing = (filter, callback) => {
  const sql = `SELECT COUNT("title") AS "totalData" FROM movies WHERE 
  to_char("releaseDate", 'FMMonth') = $1 AND to_char("releaseDate", 'FMYYYY') = $2`;

  const values = [filter.month, filter.year];
  db.query(sql, values, callback);
};
