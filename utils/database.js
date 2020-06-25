const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "siarhei",
  database: "node-complete",
  password: "123698745wasd",
});

module.exports = pool.promise();
