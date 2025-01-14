const { HttpError } = require("../models/helpers");
const { schemas } = require("../models/users");

const validateSignUpBody = (req, res, next) => {
  const { error } = schemas.registerSchema.validate(req.body);
  if (error) {
    let newMessage = error.message.split('"');
    newMessage = `missing required ${newMessage[1]} field`;
    throw HttpError(400, newMessage);
  }
  next();
};

const validateSignInBody = (req, res, next) => {
  const { error } = schemas.loginSchema.validate(req.body);
  if (error) {
    let newMessage = error.message.split('"');
    newMessage = `missing required ${newMessage[1]} field`;
    throw HttpError(400, newMessage);
  }
  next();
};

const validateEmail = (req, res, next) => {
  const { error } = schemas.emailSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required field email");
  }
  next();
};

module.exports = {
  validateSignUpBody,
  validateSignInBody,
  validateEmail,
};
