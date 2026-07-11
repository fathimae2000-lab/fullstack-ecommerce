const { Pool } = require('pg');

let pool;

if (process.env.DATABASE_URL) {
  // This block runs on Render
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false 
    }
  });
} else {
  // This block runs locally on your machine
  pool = new Pool({
    user: "fullstack",
    password: "fathy",
    host: "localhost",
    port: 5432,
    database: "fullstack_db"
  });
}

module.exports = pool;