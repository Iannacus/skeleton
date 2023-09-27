const jwt = require("jsonwebtoken");
require("dotenv").config();

const signToken = (data, secret, expiresIn) => {
  return jwt.sign(data, secret, {
    expiresIn,
    algorithm: "HS512",
  });
};

const signAuthToken = (data) => {
  return signToken(data, process.env.JWT_SECRET, "1h");
};

const signCofirmToken = (data) => {
  return signToken(data, process.env.JWT_EMAIL_SECRET, "3d");
};

module.exports = {
  signAuthToken,
  signCofirmToken,
};
