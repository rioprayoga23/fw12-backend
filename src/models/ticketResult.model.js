const db = require("../helpers/db.helper");

exports.readTicketResult = (id, callback) => {
  const sql = `SELECT m.title, string_agg(distinct g.name,', ') AS genre,to_char(t."bookingDate",  'Day, DD FMMonth YYYY') AS "bookingDate", t."bookingTime",COUNT(distinct rs."seatNum") AS count,string_agg(distinct rs."seatNum",', ') AS "seatNum", t.total FROM transactions t
  JOIN movies m ON m.id = t."movieId"
  JOIN "movieGenre" mg ON mg."movieId" = m.id
  JOIN genre g ON g.id = mg."genreId"
  JOIN "reservedSeat" rs ON rs."transactionId" = t.id
  WHERE t.id=$1 GROUP BY m.id, t.id`;
  const values = [id];
  return db.query(sql, values, callback);
};
