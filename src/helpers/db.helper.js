const { Pool } = require("pg");

const db = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgresql:postgres:1@localhost:5432/tiketku",
});

db.connect((err) => {
  if (err) {
    console.log("Connection error");
  } else {
    console.log("Connection OK");
  }
});

module.exports = db;
