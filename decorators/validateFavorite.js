const { HttpError } = require("../models/helpers");
const { schemas } = require("./validateBody");

const validateFavorite = (req, res, next) => {
  const { error } = schemas.favoriteSchema.validate(req.body);
  if (error) {
    let newMessage = error.message.split('"');
    newMessage = `missing required ${newMessage[1]} field`;
    throw HttpError(400, newMessage);
  }
  next();
};

module.exports = validateFavorite;
