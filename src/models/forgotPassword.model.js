const db = require("../helpers/db.helper");

exports.readAllForgotPassword = (callback) => {
  return db.query('SELECT * FROM "forgotPassword"', callback);
};

exports.createForgotPassword = (data, callback) => {
  const { userId, code } = data;
  const sql =
    'INSERT INTO "forgotPassword" ("userId","code") VALUES ($1,$2) RETURNING *';
  const values = [userId, code];
  return db.query(sql, values, callback);
};

exports.updateForgotPassword = (data, id, callback) => {
  const { userId, code } = data;

  const sql = `UPDATE "forgotPassword" SET "userId"=COALESCE(NULLIF($1, '')::INTEGER, "userId"),"code"=COALESCE(NULLIF($2, ''), "code"), "updatedAt"=$3 WHERE id =$4 RETURNING *`;
  const values = [userId, code, new Date(), id];
  db.query(sql, values, callback);
};

exports.deleteForgotPassword = (req, callback) => {
  const id = parseInt(req.params.id);

  db.query(
    'DELETE FROM "forgotPassword" WHERE id = $1 RETURNING *',
    [id],
    callback
  );
};
