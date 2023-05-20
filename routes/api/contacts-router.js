const express = require("express");
const router = express.Router();

const contactController = require("../../controllers/contacts-controllers");
const {
  validateBody,
  checkBody,
  isValidId,
  validateFavorite,
} = require("../../decorators");

router.get("/", contactController.getAllContacts);

router.get("/:contactId", isValidId, contactController.getContact);

router.post("/", validateBody, contactController.postContact);

router.delete("/:contactId", isValidId, contactController.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  checkBody,
  validateBody,
  contactController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavorite,
  contactController.updateStatusContact
);

module.exports = router;
