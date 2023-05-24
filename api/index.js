const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../controller");

const {schemas} = require("../service/schemas/contact");
const {validateBody, isValidId} = require("../middlewares");

router.get("/contacts/", getAllContacts);

router.get("/contacts/:contactId", isValidId, getContactById);

router.post("/contacts/", validateBody(schemas.addContactSchema), addContact);

router.delete("/contacts/:contactId", isValidId, removeContact);

router.put(
  "/contacts/:contactId",
  isValidId,
  validateBody(schemas.addContactSchema),
  updateContact
);

router.patch(
  "/contacts/:contactId/favorit",
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  updateStatusContact
);

module.exports = router;
