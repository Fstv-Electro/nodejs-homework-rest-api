const { HttpError } = require("../models/helpers");
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .max(30)
    .pattern(/^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){1,2}$/),
  email: Joi.string().required().email({ minDomainSegments: 2 }),
  phone: Joi.string()
    .required()
    .pattern(/^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "numbers"),
});

const validateBody = (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    let newMessage = error.message.split('"');
    newMessage = `missing required ${newMessage[1]} field`;
    throw HttpError(400, newMessage);
  }
  next();
};

module.exports = validateBody;
