const { check } = require("express-validator");

exports.createUser = [
  check("firstName").isLength({ min: 2 }),
  check("lastName").isLength({ min: 2 }),
  check("number").isNumeric().isLength({ min: 10 }),
  check("email").isEmail(),
  check("password").isLength({ min: 8 }),
  check("confirmPassword").isLength({ min: 8 }),
];

// exports.anotherRoute = [// check data];

// exports.doSomethingElse = [// check data];
