const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

module.exports.register = (req, res) => {
  res.render("register");
};

module.exports.login = (req, res) => {
  res.render("login");
};
