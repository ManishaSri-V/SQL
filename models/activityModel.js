// All the queries and operations live here
const db = require("../config/db");

const Activity = {
  log: (userId, action, description, callback) => {
    const query =
      "INSERT INTO activity_logs (user_id, action, description) VALUES (?, ?, ?);";

    db.query(query, [userId, action, description], callback);
  },
  findAll: (callback) => {
    const query = "SELECT * FROM activity_logs;";
    db.query(query, callback);
  },
};

module.exports = Activity;
