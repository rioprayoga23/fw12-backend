const db = require("../helpers/db.helper");

exports.readAllMovieScheduleTimes = (callback) => {
  const sql = 'SELECT * FROM "movieScheduleTimes"';
  return db.query(sql, callback);
};

exports.createMovieScheduleTime = (data, callback) => {
  const { time, movieScheduleId } = data;
  const sql =
    'INSERT INTO "movieScheduleTimes" ("time","movieScheduleId") VALUES ($1,$2) RETURNING *';
  const values = [time, movieScheduleId];
  return db.query(sql, values, callback);
};

exports.updateMovieScheduleTime = (data, id, callback) => {
  const { time, movieScheduleId } = data;

  const sql = `UPDATE "movieScheduleTimes" SET "time"=COALESCE(NULLIF($1, '')::TIME, "time"), "movieScheduleId"=COALESCE(NULLIF($2, '')::INTEGER, "movieScheduleId"), "updatedAt"=$3 WHERE id =$4 RETURNING *`;

  const values = [time, movieScheduleId, new Date(), id];
  db.query(sql, values, callback);
};

exports.deleteMovieScheduleTime = (id, callback) => {
  const sql = 'DELETE FROM "movieScheduleTimes" WHERE id = $1 RETURNING *';
  const values = [id];
  db.query(sql, values, callback);
};
