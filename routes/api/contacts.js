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

const {schemas} = require("../../models/contact");
const {validateBody, isValidId} = require("../../middlewares");

router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(schemas.addContactSchema), addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addContactSchema),
  updateContact
);

router.patch(
  "/:contactId/favorit",
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  updateStatusContact
);

module.exports = router;
