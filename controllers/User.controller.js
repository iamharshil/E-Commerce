const { validationResult } = require("express-validator");
const User = require("../models/User.model");

module.exports.create = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }
    if (req.body.password == req.body.confirmPassword) {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        number: req.body.number,
        email: req.body.email,
        password: req.body.password,
      });
      user
        .save()
        .then(() => {
          res.status(200).json({
            message: "User created successfully",
          });
        })
        .catch((err) => {
          res.json({ err });
        });
    } else {
      res
        .status(403)
        .json({ errors: [{ message: "passwords doesn't match" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: [{ message: error }] });
  }
};

// for view the profile of user
// user will get id or username as param
module.exports.read = (req, res) => {
  return res.send("Read User");
};
// for updating view profile or direct update
module.exports.update = (req, res) => {
  return res.send("Update User");
};
// delete user through view profile
module.exports.delete = (req, res) => {
  return res.send("delete User");
};
