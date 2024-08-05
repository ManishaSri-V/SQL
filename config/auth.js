// This will handle 2 modular functions of generating a token and verifying a token

const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/userModel");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "72h",
    }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
