const express = require("express");
const ctrl = require("../../controllers/auth-controller");
const { authenticate } = require("../../decorators");

const {
  validateSignInBody,
  validateSignUpBody,
} = require("../../decorators/validateUserBody.js");
const authController = require("../../controllers/auth-controller");
const router = express.Router();

router.post("/register", validateSignUpBody, ctrl.register);
router.post("/login", validateSignInBody, ctrl.login);
router.get("/current", authenticate, authController.getCurrent);
router.post("/logout", authenticate, authController.logout);

module.exports = router;
