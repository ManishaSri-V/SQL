const db = require("../config/db");

const User = {
  create: (data, callback) => {
    const query =
      "INSERT INTO users (name, email, password, role, age) VALUES (?, ?, ?, ?, ?);";

    db.query(
      query,
      [data.name, data.email, data.password, data.role, data.age],
      callback
    );
  },
  findAll: (callback) => {
    const query = "SELECT * FROM users;";
    db.query(query, callback);
  },
  findById: (id, callback) => {
    const query = "SELECT * FROM users WHERE id = ?;";
    db.query(query, [id], callback);
  },
  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?;";
    db.query(query, [email], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      callback(null, results[0]);
    });
  },
  update: (id, data, callback) => {
    const query =
      "UPDATE users SET name = ?, email = ?, age = ?, role = ? WHERE id = ?;";
    db.query(query, [data.name, data.email, data.age, data.role, id], callback);
  },
  delete: (id, callback) => {
    const query = "DELETE FROM users WHERE id = ?;";
    db.query(query, [id], callback);
  },
};

module.exports = { User };
