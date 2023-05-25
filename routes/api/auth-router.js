const express = require("express");
const ctrl = require("../../controllers/auth-controller");

const {
  validateSignInBody,
  validateSignUpBody,
} = require("../../decorators/validateUserBody.js");
const router = express.Router();

router.post("/register", validateSignUpBody, ctrl.register);

module.exports = router;
