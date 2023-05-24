const express = require("express");
const router = express.Router();
const {validateBody} = require("../../middlewares");
const {schemas} = require("../../models/user");
const {register} = require("../../controller/auth");

router.post("/register", validateBody(schemas.registerSchema), register);

module.exports = router;
