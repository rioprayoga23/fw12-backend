const db = require("../helpers/db.helper");

exports.readAllGenre = (callback) => {
  const sql = "SELECT * FROM genre";
  return db.query(sql, callback);
};

exports.createGenre = (data, callback) => {
  const { name } = data;
  const sql = 'INSERT INTO genre ("name") VALUES ($1) RETURNING *';
  const values = [name];
  return db.query(sql, values, callback);
};

exports.updateGenre = (data, id, callback) => {
  const { name } = data;

  const sql = `UPDATE genre SET "name"=COALESCE(NULLIF($1, ''), "name"), "updatedAt"= $2 WHERE id =$3 RETURNING *`;
  const values = [name, new Date(), id];
  db.query(sql, values, callback);
};

exports.deleteGenre = (id, callback) => {
  const sql = "DELETE FROM Genre WHERE id = $1 RETURNING *";
  const values = [id];
  db.query(sql, values, callback);
};
