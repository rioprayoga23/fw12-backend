const db = require("../helpers/db.helper");

exports.getAllMovieCast = (callback) => {
  const sql = 'SELECT * FROM "movieCast"';
  return db.query(sql, callback);
};

exports.createMovieCast = (data, callback) => {
  const { movieId, castId } = data;
  const sql =
    'INSERT INTO "movieCast" ("movieId","castId") VALUES ($1,$2) RETURNING *';
  const values = [movieId, castId];
  return db.query(sql, values, callback);
};

exports.updateMovieCast = (data, id, callback) => {
  const { movieId, castId } = data;

  const sql = `UPDATE "movieCast" SET "movieId"=COALESCE(NULLIF($1, '')::INTEGER, "movieId"), "castId"=COALESCE(NULLIF($2, '')::INTEGER, "castId"), "updatedAt"=$3 WHERE id =$4 RETURNING *`;
  const values = [movieId, castId, new Date(), id];

  db.query(sql, values, callback);
};

exports.deleteMovieCast = (id, callback) => {
  const sql = 'DELETE FROM "movieCast" WHERE id = $1 RETURNING *';
  const values = [id];

  db.query(sql, values, callback);
};
