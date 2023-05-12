const Joi = require("joi");
const contacts = require("../models/contacts");
const { HttpError } = require("../models/helpers/HttpError");

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

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const postContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      let newMessage = error.message.split('"');
      newMessage = `missing required ${newMessage[1]} field`;
      throw HttpError(400, newMessage);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const body = req.body;
    if (Object.keys(body).length === 0) {
      throw HttpError(400, "missing fields");
    }

    const { error } = addSchema.validate(body);
    if (error) {
      let newMessage = error.message.split('"');
      newMessage = `missing required ${newMessage[1]} field`;
      throw HttpError(400, newMessage);
    }

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContact,
  postContact,
  deleteContact,
  updateContact,
};
