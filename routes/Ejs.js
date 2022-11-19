const express = require("express");
const router = express.Router();
const UserEjsController = require("../controllers/UserEjs.controller");
// const { body, validationResult } = require("express-validator");
const validator = require("../validation/validator");

// create get view
router.get("/user/create", UserEjsController.createView);

// create post data
router.post("/user/create", validator.createUser, UserEjsController.create);

module.exports = router;
