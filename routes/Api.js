const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User.controller");
const { body, validationResult } = require("express-validator");
const validator = require("../validation/validator");

router.post("/user/create", validator.createUser, UserController.create);

// user will get id or username as param
router.get("/user/:id", UserController.read);

router.get("/user/update", UserController.update);

router.get("/user/delete", UserController.delete);

module.exports = router;
