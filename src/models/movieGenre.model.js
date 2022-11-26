const db = require("../helpers/db.helper");

exports.readAllMovieGenre = (callback) => {
  const sql = 'SELECT * FROM "movieGenre"';
  return db.query(sql, callback);
};

exports.createMovieGenre = (data, callback) => {
  const { movieId, genreId } = data;
  const sql =
    'INSERT INTO "movieGenre" ("movieId","genreId") VALUES ($1,$2) RETURNING *';
  const values = [movieId, genreId];
  return db.query(sql, values, callback);
};

exports.updateMovieGenre = (data, id, callback) => {
  const { movieId, genreId } = data;
  const sql = `UPDATE "movieGenre" SET "movieId"=COALESCE(NULLIF($1, '')::INTEGER, "movieId"), "genreId"=COALESCE(NULLIF($2, '')::INTEGER, "genreId"), "updatedAt"=$3 WHERE id =$4 RETURNING *`;
  const values = [movieId, genreId, new Date(), id];
  db.query(sql, values, callback);
};

exports.deleteMovieGenre = (id, callback) => {
  const sql = 'DELETE FROM "movieGenre" WHERE id = $1 RETURNING *';
  const values = [id];
  db.query(sql, values, callback);
};
