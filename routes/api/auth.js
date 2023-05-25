const express = require("express");
const router = express.Router();
const {validateBody, authenticate} = require("../../middlewares");
const {schemas} = require("../../models/user");
const {register, login, getCurrent, logout} = require("../../controller/auth");

router.post("/register", validateBody(schemas.registerSchema), register);
router.post("/login", validateBody(schemas.loginSchema), login);
router.get("/current", authenticate, getCurrent);
router.get("/logout", authenticate, logout);

module.exports = router;
