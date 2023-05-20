const { HttpError } = require("../models/helpers");
const { schemas } = require("../models/contact");

const validateBody = (req, res, next) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    let newMessage = error.message.split('"');
    newMessage = `missing required ${newMessage[1]} field`;
    throw HttpError(400, newMessage);
  }
  next();
};

module.exports = validateBody;
