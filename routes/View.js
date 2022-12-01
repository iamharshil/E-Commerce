const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/User.controller");
const auth = require("./verifyToken");
const ViewController = require("../controllers/ViewController");

Router.get("/register", ViewController.register);
Router.get("/login", ViewController.login);
Router.get("/posts", auth, UserController.posts);
Router.get("/user", UserController.User);

module.exports = Router;
