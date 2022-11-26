const db = require("../helpers/db.helper");

exports.readAllSubscribers = (callback) => {
  const sql = "SELECT * FROM subscribers";
  return db.query(sql, callback);
};

exports.createSubscriber = (data, callback) => {
  const { email } = data;
  const sql = 'INSERT INTO subscribers ("email") VALUES ($1) RETURNING *';
  const values = [email];
  return db.query(sql, values, callback);
};

exports.updateSubscriber = (data, id, callback) => {
  const { email } = data;
  const sql = `UPDATE Subscribers SET "email"=COALESCE(NULLIF($1, ''), "email"), "updatedAt"= $2 WHERE id =$3 RETURNING *`;
  const values = [email, new Date(), id];

  db.query(sql, values, callback);
};

exports.deleteSubscriber = (id, callback) => {
  const sql = "DELETE FROM subscribers WHERE id = $1 RETURNING *";
  const values = [id];
  db.query(sql, values, callback);
};
