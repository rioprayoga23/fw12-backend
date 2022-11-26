const db = require("../helpers/db.helper");

exports.readAllStatus = (callback) => {
  const sql = "SELECT * FROM status";
  return db.query(sql, callback);
};

exports.createStatus = (data, callback) => {
  const { name } = data;
  const sql = 'INSERT INTO status ("name") VALUES ($1) RETURNING *';
  const values = [name];
  return db.query(sql, values, callback);
};

exports.updateStatus = (data, id, callback) => {
  const { name } = data;
  const sql = `UPDATE status SET "name"=COALESCE(NULLIF($1, ''), "name"), "updatedAt"= $2 WHERE id =$3 RETURNING *`;
  const values = [name, new Date(), id];
  db.query(sql, values, callback);
};

exports.deleteStatus = (id, callback) => {
  const sql = "DELETE FROM status WHERE id = $1 RETURNING *";
  const values = [id];
  db.query(sql, values, callback);
};
