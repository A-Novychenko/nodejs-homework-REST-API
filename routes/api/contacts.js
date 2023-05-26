const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controller/contacts");

const {authenticate} = require("../../middlewares");

const {schemas} = require("../../models/contact");
const {validateBody, isValidId} = require("../../middlewares");

router.get("/", authenticate, getAllContacts);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addContactSchema),
  addContact
);

router.delete("/:contactId", authenticate, isValidId, removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addContactSchema),
  updateContact
);

router.patch(
  "/:contactId/favorit",
  authenticate,
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  updateStatusContact
);

module.exports = router;
