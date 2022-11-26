const db = require("../helpers/db.helper");

exports.readAllCinemas = (callback) => {
  db.query("SELECT * FROM cinemas", callback);
};

exports.createCinema = (data, callback) => {
  const { name, picture, address, city } = data;
  const sql =
    'INSERT INTO cinemas ("name","picture","address","city") VALUES ($1,$2,$3,$4) RETURNING *';
  const values = [name, picture, address, city];
  return db.query(sql, values, callback);
};

exports.readCinema = (id, callback) => {
  const sql = "SELECT * FROM cinemas WHERE id = $1";
  const values = [id];
  db.query(sql, values, callback);
};

exports.updateCinema = (data, id, callback) => {
  const { name, picture, address, city } = data;
  const sql = `UPDATE cinemas SET "name" =COALESCE(NULLIF($1, ''), "name"), "picture" =COALESCE(NULLIF($2, ''), "picture"),"address" =COALESCE(NULLIF($3, ''), "address"),"city" =COALESCE(NULLIF($4, ''), "city"),"updatedAt" =$5 WHERE id =$6 RETURNING *`;

  const values = [name, picture, address, city, new Date(), id];

  db.query(sql, values, callback);
};

exports.deleteCinema = (id, callback) => {
  const sql = "DELETE FROM cinemas WHERE id = $1 RETURNING *";
  const values = [id];

  db.query(sql, values, callback);
};
