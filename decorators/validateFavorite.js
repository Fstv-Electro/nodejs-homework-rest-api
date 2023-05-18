const { HttpError } = require("../models/helpers");
const { schemas } = require("../models/contact");

const validateFavorite = (req, res, next) => {
  const { error } = schemas.favoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, { message: "missing field favorite" });
  }
  next();
};

module.exports = validateFavorite;
