const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("./helpers");
const Joi = require("joi");

const namePattern = /^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){1,2}$/;
const phonePattern = /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contacts", contactSchema);

const addSchema = Joi.object({
  name: Joi.string().required().min(3).max(30).pattern(namePattern),
  email: Joi.string().required().email({ minDomainSegments: 2 }),
  phone: Joi.string().required().pattern(phonePattern, "numbers"),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  favoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};
