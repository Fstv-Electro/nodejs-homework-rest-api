const express = require("express");
const router = express.Router();

const contactController = require("../../controllers/contacts-controllers");
const { validateBody, checkBody } = require("../../decorators");

router.get("/", contactController.getAllContacts);

router.get("/:contactId", contactController.getContact);

router.post("/", validateBody, contactController.postContact);

router.delete("/:contactId", contactController.deleteContact);

router.put(
  "/:contactId",
  validateBody,
  checkBody,
  contactController.updateContact
);

module.exports = router;
