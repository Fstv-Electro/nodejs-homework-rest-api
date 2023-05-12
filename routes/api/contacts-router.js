const express = require("express");
const router = express.Router();

const contactController = require("../../controllers/contacts-controllers");

router.get("/", contactController.getAllContacts);

router.get("/:contactId", contactController.getContact);

router.post("/", contactController.postContact);

router.delete("/:contactId", contactController.deleteContact);

router.put("/:contactId", contactController.updateContact);

module.exports = router;
