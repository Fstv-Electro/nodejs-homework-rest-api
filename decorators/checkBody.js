const { HttpError } = require("../models/helpers");

const checkBody = (req, res, next) => {
  const body = req.body;
  console.log(Object.keys(body).length);
  if (Object.keys(body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  next();
};

module.exports = checkBody;
