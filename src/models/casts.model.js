const db = require("../helpers/db.helper");

exports.readAllCasts = (filter, callback) => {
  const sql = `SELECT * FROM casts WHERE name LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`;
  const values = [`%${filter.search}%`, filter.limit, filter.offset];
  return db.query(sql, values, callback);
};

exports.readCountAllCast = (filter, callback) => {
  const sql = `SELECT COUNT("name") AS "totalData" FROM "casts" WHERE name LIKE $1`;
  const values = [`%${filter.search}%`];
  db.query(sql, values, callback);
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
