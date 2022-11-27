const db = require("../helpers/db.helper");

exports.readAllGenre = (filter, callback) => {
  const sql = `SELECT * FROM genre WHERE name LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`;
  const values = [`%${filter.search}%`, filter.limit, filter.offset];
  return db.query(sql, values, callback);
};

exports.readCountAllGenre = (filter, callback) => {
  const sql = `SELECT COUNT("name") AS "totalData" FROM "genre" WHERE name LIKE $1`;
  const values = [`%${filter.search}%`];
  return db.query(sql, values, callback);
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
