const { Pool } = require("pg");

const db = new Pool({
  connectionString:
    "postgres://postgres:KTAm64vsBJjfSzDQ@db.nviuugjfkaynwjepxmoy.supabase.co:6543/postgres",
});

db.connect((err) => {
  if (err) {
    console.log("Connection error");
  } else {
    console.log("Connection OK");
  }
});

module.exports = db;
