const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");
const User = require("../models/User.model");
const { validate } = require("../models/User.model");
const cors = require("cors");

module.exports.register = async (req, res) => {
  try {
    // validate data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if email exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    try {
      const savedUser = await user.save();
      res.redirect("/login");
    } catch (err) {
      res.status(400).send(err);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.login = async (req, res) => {
  // validate the data before we login
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // checking if email doesn't exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is wrong.");

  // if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email or password is wrong");

  // create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.cookie("auth-token", token, {
    Expires: new Date(Date.now() + 60),
    maxAge: 60000,
  });
  // .setHeader("auth-token", token)
  // res.cookie.expires = new Date(Date.now() + 60);
  res.cookie.Expires = new Date(Date.now() + 60);
  res.redirect("/api/posts");

  // res.send("Logged In");
};

module.exports.posts = (req, res) => {
  res.send({
    posts: {
      title: "My first post",
      description: "Random data you shouldn't access",
    },
    user: req.user,
  });
};

module.exports.User = async (req, res) => {
  const users = await User.find();
  res.send(users);
};
