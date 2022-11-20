const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/User.controller");

Router.post("/user/create", UserController.create);

module.exports = Router;
