const db = require("../helpers/db.helper");

exports.readAllCasts = (callback) => {
  const sql = "SELECT * FROM casts";
  return db.query(sql, callback);
};

exports.createCast = (data, callback) => {
  const { name } = data;
  const sql = 'INSERT INTO casts ("name") VALUES ($1) RETURNING *';
  const values = [name];
  return db.query(sql, values, callback);
};

exports.updateCast = (data, id, callback) => {
  const { name } = data;
  const sql = `UPDATE casts SET "name"=COALESCE(NULLIF($1, ''), "name"), "updatedAt"= $2 WHERE id =$3 RETURNING *`;
  const values = [name, new Date(), id];

  db.query(sql, values, callback);
};

exports.deleteCast = (id, callback) => {
  const sql = "DELETE FROM casts WHERE id = $1 RETURNING *";
  const values = [id];
  db.query(sql, values, callback);
};
