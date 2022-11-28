const db = require("../helpers/db.helper");

exports.readAllUsers = (filter, callback) => {
  const sql = `SELECT * FROM users WHERE "firstName" LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`;
  const values = [`%${filter.search}%`, filter.limit, filter.offset];
  db.query(sql, values, callback);
};

exports.readCountAllUsers = (filter, callback) => {
  const sql = `SELECT COUNT("firstName") AS "totalData" FROM users WHERE "firstName" LIKE $1`;
  const values = [`%${filter.search}%`];
  db.query(sql, values, callback);
};

exports.createUser = (data, callback) => {
  const { picture, firstName, lastName, phoneNumber, email, password } = data;
  const sql =
    'INSERT INTO users ("picture","firstName","lastName","phoneNumber","email","password") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
  const values = [picture, firstName, lastName, phoneNumber, email, password];
  return db.query(sql, values, callback);
};

exports.readUser = (id, callback) => {
  const sql = "SELECT * FROM users WHERE id = $1";
  const values = [id];
  db.query(sql, values, callback);
};

exports.readUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = $1";
  const values = [email];
  db.query(sql, values, callback);
};

exports.updateUser = (data, id, callback) => {
  const sql = `UPDATE users SET "picture" = COALESCE(NULLIF($1, ''), "picture"), "firstName" =COALESCE(NULLIF($2, ''), "firstName"), "lastName" =COALESCE(NULLIF($3, ''), "lastName"),"phoneNumber" =COALESCE(NULLIF($4, ''), "phoneNumber"),"email" =COALESCE(NULLIF($5, ''), "email"),"password" =COALESCE(NULLIF($6, ''), "password"), "updatedAt"=$7 WHERE "id" =$8 RETURNING *`;

  const { picture, firstName, lastName, phoneNumber, email, password } = data;

  const values = [
    picture,
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    new Date(),
    id,
  ];

  db.query(sql, values, callback);
};

exports.deleteUser = (id, callback) => {
  const sql = "DELETE FROM users WHERE id = $1 RETURNING *";
  const values = [id];
  db.query(sql, values, callback);
};
