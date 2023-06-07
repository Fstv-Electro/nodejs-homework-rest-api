const express = require("express");
const ctrl = require("../../controllers/auth-controller");
const { authenticate, upload } = require("../../decorators");

const {
  validateSignInBody,
  validateSignUpBody,
  validateEmail,
} = require("../../decorators/validateUserBody.js");
const authController = require("../../controllers/auth-controller");
const router = express.Router();

router.post("/register", validateSignUpBody, ctrl.register);
router.post("/login", validateSignInBody, ctrl.login);
router.get("/current", authenticate, authController.getCurrent);
router.post("/logout", authenticate, authController.logout);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
router.get("/verify/:verficationToken", ctrl.verifyEmail);
router.post("/verify", validateEmail, ctrl.resendVerifyEmail);

module.exports = router;
