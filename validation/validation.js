const joi = require("joi");

const registerValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = {
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  };
  return joi.validate(data, schema);
};

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
