const db = require("../helpers/db.helper");

exports.readAllReservedSeat = (callback) => {
  const sql = 'SELECT * FROM "reservedSeat"';
  return db.query(sql, callback);
};

exports.createReservedSeat = async (data) => {
  const { seatNum, transactionId } = data;
  const seats = seatNum.map((num) => `(${num}, ${transactionId})`).join(", ");
  const sql = `INSERT INTO "reservedSeat" ("seatNum","transactionId") VALUES ${seats} RETURNING *`;
  const results = await db.query(sql);
  return results.rows[0];
};

exports.updateReservedSeat = (data, id, callback) => {
  const { seatNum, transactionId } = data;
  const sql = `UPDATE "reservedSeat" SET "seatNum"=COALESCE(NULLIF($1, ''), "seatNum"),"transactionId"=COALESCE(NULLIF($2, '')::INTEGER, "transactionId"), "updatedAt"= $3 WHERE id =$4 RETURNING *`;
  const values = [seatNum, transactionId, new Date(), id];

  db.query(sql, values, callback);
};

exports.deleteReservedSeat = (id, callback) => {
  const sql = 'DELETE FROM "reservedSeat" WHERE id = $1 RETURNING *';
  const values = [id];
  db.query(sql, values, callback);
};
