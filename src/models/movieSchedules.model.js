const db = require("../helpers/db.helper");

exports.readAllMovieSchedules = (callback) => {
  const sql = 'SELECT * FROM "movieSchedules"';
  return db.query(sql, callback);
};

exports.readMovieSchedule = (id, callback) => {
  const sql = 'SELECT * FROM "movieSchedules" WHERE id = $1';
  const values = [id];
  db.query(sql, values, callback);
};

exports.createMovieSchedule = (data, callback) => {
  const { movieId, cinemaId, price, startDate, endDate } = data;
  const sql =
    'INSERT INTO "movieSchedules" ("movieId","cinemaId","price","startDate","endDate") VALUES ($1,$2,$3,$4,$5) RETURNING *';

  const values = [movieId, cinemaId, price, startDate, endDate];

  return db.query(sql, values, callback);
};

exports.updateMovieSchedule = (data, id, callback) => {
  const { movieId, cinemaId, price, startDate, endDate } = data;
  const sql = `UPDATE "movieSchedules" SET "movieId"=COALESCE(NULLIF($1, '')::INTEGER, "movieId"), "cinemaId"=COALESCE(NULLIF($2, '')::INTEGER, "cinemaId"),"price"=COALESCE(NULLIF($3, '')::BIGINT, "price"),"startDate"=COALESCE(NULLIF($4, '')::TIMESTAMPTZ, "startDate"),"endDate"=COALESCE(NULLIF($5, '')::TIMESTAMPTZ, "endDate"), "updatedAt"=$6 WHERE id =$7 RETURNING *`;
  const values = [movieId, cinemaId, price, startDate, endDate, new Date(), id];
  db.query(sql, values, callback);
};

exports.deleteMovieSchedule = (id, callback) => {
  const sql = 'DELETE FROM "movieSchedules" WHERE id = $1 RETURNING *';
  const values = [id];
  db.query(sql, values, callback);
};

exports.getScheduleByMovieId = (data, id, callback) => {
  const sql = `SELECT ms.id, ms.price,c.picture,c.name,c.address,c.city,ARRAY_AGG(mt.time) AS time FROM "movies" m
JOIN "movieSchedules" ms ON ms."movieId" = m.id
JOIN cinemas c ON c.id = ms."cinemaId" 
JOIN "movieScheduleTimes" mt ON mt."movieScheduleId" = ms.id 
WHERE m.id = $1 AND c.city = $2 AND TO_DATE($3, 'YYYY-MM-DD') BETWEEN ms."startDate" AND ms."endDate"
GROUP BY m.id, ms.id,c.id`;

  const values = [id, data.city, data.date];
  db.query(sql, values, callback);
};
