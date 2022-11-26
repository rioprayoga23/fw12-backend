const db = require("../helpers/db.helper");

exports.readAllPayments = (callback) => {
  const sql = 'SELECT * FROM "paymentMethod"';
  return db.query(sql, callback);
};

exports.createPayment = (data, callback) => {
  const { picture, name } = data;
  const sql =
    'INSERT INTO "paymentMethod" ("picture","name") VALUES ($1,$2) RETURNING *';
  const values = [picture, name];
  return db.query(sql, values, callback);
};

exports.updatePayment = (data, id, callback) => {
  const { picture, name } = data;

  const sql = `UPDATE "paymentMethod" SET "picture"=COALESCE(NULLIF($1, ''), "picture"), "name"=COALESCE(NULLIF($2, ''), "name"), "updatedAt"= $3 WHERE id =$4 RETURNING *`;
  const values = [picture, name, new Date(), id];

  db.query(sql, values, callback);
};

exports.deletePayment = (id, callback) => {
  const sql = 'DELETE FROM "paymentMethod" WHERE id = $1 RETURNING *';
  const values = [id];
  db.query(sql, values, callback);
};
