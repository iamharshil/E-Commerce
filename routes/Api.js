const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/User.controller");
const auth = require("./verifyToken");

Router.post("/user/register", UserController.register);
Router.post("/user/login", UserController.login);
Router.get("/posts", auth, UserController.posts);
// Router.get("/user", UserController.User);

module.exports = Router;
