// const bcrypt = require("bcryptjs");
const { registerValidation } = require("../validation/validation");
const User = require("../models/User.model");

module.exports.create = async (req, res) => {
  // validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if email exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};
