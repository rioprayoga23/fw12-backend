const db = require("../helpers/db.helper");

exports.readAllTransactions = (filter, callback) => {
  const sql = `SELECT * FROM transactions WHERE "fullName" LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`;
  const values = [`%${filter.search}%`, filter.limit, filter.offset];
  db.query(sql, values, callback);
};

exports.readCountAllTransactions = (filter, callback) => {
  const sql = `SELECT COUNT("fullName") AS "totalData" FROM transactions WHERE "fullName" LIKE $1`;
  const values = [`%${filter.search}%`];
  db.query(sql, values, callback);
};

exports.createTransaction = (data, callback) => {
  const {
    bookingDate,
    movieId,
    cinemaId,
    movieScheduleId,
    fullName,
    email,
    phoneNumber,
    idStatus,
  } = data;

  const sql =
    'INSERT INTO transactions ("bookingDate","movieId","cinemaId","movieScheduleId","fullName","email","phoneNumber","idStatus") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';

  const values = [
    bookingDate,
    movieId,
    cinemaId,
    movieScheduleId,
    fullName,
    email,
    phoneNumber,
    idStatus,
  ];
  return db.query(sql, values, callback);
};

exports.readTransaction = (id, callback) => {
  const sql = "SELECT * FROM transactions WHERE id = $1";
  const values = [id];
  db.query(sql, values, callback);
};

exports.updateTransaction = (data, id, callback) => {
  const {
    bookingDate,
    movieId,
    cinemaId,
    movieScheduleId,
    fullName,
    email,
    phoneNumber,
    idStatus,
  } = data;

  const sql = `UPDATE transactions SET "bookingDate" =COALESCE(NULLIF($1, '')::TIMESTAMPTZ, "bookingDate"), "movieId" =COALESCE(NULLIF($2, '')::INTEGER, "movieId"),"cinemaId" =COALESCE(NULLIF($3, '')::INTEGER, "cinemaId"),"movieScheduleId" =COALESCE(NULLIF($4, '')::INTEGER, "movieScheduleId"),"fullName" =COALESCE(NULLIF($5, ''), "fullName"),"email" =COALESCE(NULLIF($6, ''), "email"),"phoneNumber"=COALESCE(NULLIF($7, ''), "phoneNumber"),"idStatus"=COALESCE(NULLIF($8, '')::INTEGER, "idStatus"), "updatedAt"=$9 WHERE id =$10 RETURNING *`;

  const values = [
    bookingDate,
    movieId,
    cinemaId,
    movieScheduleId,
    fullName,
    email,
    phoneNumber,
    idStatus,
    new Date(),
    id,
  ];

  db.query(sql, values, callback);
};

exports.deleteTransaction = (id, callback) => {
  const sql = "DELETE FROM transactions WHERE id = $1 RETURNING *";
  const values = [id];
  db.query(sql, values, callback);
};
