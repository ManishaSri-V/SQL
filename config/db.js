const mysql = require("mysql2");

require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Error in connecting to database".err.message);
    return;
  } else {
    console.log("Connection established to the SQL database successfully");
  }
});

module.exports = connection;
