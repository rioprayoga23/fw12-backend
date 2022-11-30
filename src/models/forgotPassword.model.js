const db = require("../helpers/db.helper");

exports.readAllForgotPassword = (callback) => {
  const sql = 'SELECT * FROM "forgotPassword"';
  return db.query(sql, callback);
};

exports.readForgotPasswordByEmailAndCode = (data, callback) => {
  const { email, code } = data;
  const sql = 'SELECT * FROM "forgotPassword" WHERE email=$1 AND code=$2';
  const values = [email, code];
  return db.query(sql, values, callback);
};

exports.createForgotPassword = (data, callback) => {
  const { email, userId, code } = data;
  const sql =
    'INSERT INTO "forgotPassword" ("email","userId","code") VALUES ($1,$2,$3) RETURNING *';
  const values = [email, userId, code];
  return db.query(sql, values, callback);
};

exports.updateForgotPassword = (data, id, callback) => {
  const { email, userId, code } = data;

  const sql = `UPDATE "forgotPassword" SET "email"=COALESCE(NULLIF($1, ''), "email"), "userId"=COALESCE(NULLIF($2, '')::INTEGER, "userId"),"code"=COALESCE(NULLIF($3, ''), "code"), "updatedAt"=$3 WHERE id =$4 RETURNING *`;
  const values = [email, userId, code, new Date(), id];
  db.query(sql, values, callback);
};

exports.deleteForgotPassword = (id, callback) => {
  const sql = 'DELETE FROM "forgotPassword" WHERE id = $1 RETURNING *';
  const values = [id];
  db.query(sql, values, callback);
};
