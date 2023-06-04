const express = require("express");
const router = express.Router();
const {validateBody, authenticate, upload} = require("../../middlewares");
const {schemas} = require("../../models/user");
const {
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require("../../controller/auth");

router.post("/register", validateBody(schemas.registerSchema), register);
router.get("/verify/:verificationCode", verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.verifyEmailSchema),
  resendVerifyEmail
);
router.post("/login", validateBody(schemas.loginSchema), login);
router.get("/current", authenticate, getCurrent);
router.get("/logout", authenticate, logout);
router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  updateSubscription
);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
