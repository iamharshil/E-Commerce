const { validationResult } = require("express-validator");

module.exports.createView = (req, res) => {
  try {
    res.render("User/Create");
  } catch (error) {
    return res.send(error);
  }
};

module.exports.create = async (req, res) => {
  console.log(req.body);
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("User/Create", {
        errors: errors.array(),
      });
    }
    console.log(req.body);
    return res.send("create user");
  } catch (error) {
    return res.send(error);
  }
};
