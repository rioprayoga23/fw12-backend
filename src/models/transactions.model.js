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
    userId,
    bookingDate,
    movieId,
    cinemaId,
    movieScheduleId,
    reservedSeatId,
    fullName,
    email,
    phoneNumber,
    paymentMethodId,
    idStatus,
  } = data;

  const sql =
    'INSERT INTO transactions ("userId","bookingDate","movieId","cinemaId","movieScheduleId","reservedSeatId","fullName","email","phoneNumber","paymentMethodId","idStatus") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *';

  const values = [
    userId,
    bookingDate,
    movieId,
    cinemaId,
    movieScheduleId,
    reservedSeatId,
    fullName,
    email,
    phoneNumber,
    paymentMethodId,
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
    userId,
    bookingDate,
    movieId,
    cinemaId,
    movieScheduleId,
    reservedSeatId,
    fullName,
    email,
    phoneNumber,
    paymentMethodId,
    idStatus,
  } = data;

  const sql = `UPDATE transactions SET "userId" =COALESCE(NULLIF($1, '')::INTEGER, "userId"), "bookingDate" =COALESCE(NULLIF($2, '')::TIMESTAMPTZ, "bookingDate"), "movieId" =COALESCE(NULLIF($3, '')::INTEGER, "movieId"),"cinemaId" =COALESCE(NULLIF($4, '')::INTEGER, "cinemaId"),"movieScheduleId" =COALESCE(NULLIF($5, '')::INTEGER, "movieScheduleId"),"reservedSeatId" =COALESCE(NULLIF($6, '')::INTEGER, "reservedSeatId"),"fullName" =COALESCE(NULLIF($7, ''), "fullName"),"email" =COALESCE(NULLIF($8, ''), "email"),"phoneNumber"=COALESCE(NULLIF($9, ''), "phoneNumber"),"paymentMethodId" =COALESCE(NULLIF($10, '')::INTEGER, "paymentMethodId"),"idStatus"=COALESCE(NULLIF($11, '')::INTEGER, "idStatus"), "updatedAt"=$12 WHERE id =$13 RETURNING *`;

  const values = [
    userId,
    bookingDate,
    movieId,
    cinemaId,
    movieScheduleId,
    reservedSeatId,
    fullName,
    email,
    phoneNumber,
    paymentMethodId,
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

exports.createOrder = async (data, userId) => {
  const sql = `INSERT INTO transactions ("userId","bookingDate","movieId","cinemaId","fullName",email,"phoneNumber","paymentMethodId","idStatus",total,"bookingTime") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`;

  const results = await db.query(sql, [
    userId,
    data.bookingDate,
    data.movieId,
    data.cinemaId,
    data.fullName,
    data.email,
    data.phoneNumber,
    data.paymentMethodId,
    1,
    data.total,
    data.bookingTime,
  ]);
  return results.rows[0];
};

// exports.createOrder = async (data, userId, callback) => {
//   const dataBody = {
//     userId: userId,
//     bookingDate: data.bookingDate,
//     movieId: data.movieId,
//     cinemaId: data.cinemaId,
//     movieScheduleId: data.movieScheduleId,
//     fullName: data.fullName,
//     email: data.email,
//     phoneNumber: data.phoneNumber,
//     paymentMethodId: data.paymentMethodId,
//     idStatus: data.idStatus,
//     seatNum: data.seatNum,
//     total: data.total,
//     bookingTime: data.bookingTime,
//   };
//   try {
//     await db.query("BEGIN");

//     const sqlTransaction = `INSERT INTO transactions ("userId","bookingDate","movieId","cinemaId","fullName",email,"phoneNumber","paymentMethodId","idStatus",total,"bookingTime") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`;

//     const trxQuery = await db.query(sqlTransaction, [
//       dataBody.userId,
//       dataBody.bookingDate,
//       dataBody.movieId,
//       dataBody.cinemaId,
//       dataBody.fullName,
//       dataBody.email,
//       dataBody.phoneNumber,
//       dataBody.paymentMethodId,
//       1,
//       dataBody.total,
//       dataBody.bookingTime,
//     ]);

//     const sqlReservedSeat = `INSERT INTO "reservedSeat" ("seatNum","transactionId") VALUES ($1,currval(pg_get_serial_sequence('transactions','id'))) RETURNING *`;

//     const rsvQuery = await db.query(sqlReservedSeat, [dataBody.seatNum]);

//     await db.query("COMMIT");

//     const results = {
//       trxQuery,
//       rsvQuery,
//     };

//     callback(null, results);
//   } catch (error) {
//     // db.query("ROLLBACK");
//     callback(error, null);
//   }
// };

exports.historyOrder = (id, callback) => {
  const sql = `SELECT t.id, to_char(t."bookingDate",  'FMDay, DD FMMonth YYYY') AS "bookingDate", t."bookingDate" AS "bookingDateOri", t."bookingTime", m.title, c.picture from transactions t 
  JOIN movies m ON m.id = t."movieId"
  JOIN cinemas c ON c.id = t."cinemaId" 
  WHERE t."userId" = $1`;
  const values = [id];
  db.query(sql, values, callback);
};
