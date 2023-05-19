const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../controller");

const {contactsSchema} = require("../schemas");
const {validateBody} = require("../decorators");

router.get("/contacts/", getAllContacts);

router.get("/contacts/:contactId", getContactById);

router.post("/contacts/", validateBody(contactsSchema), addContact);

router.delete("/contacts/:contactId", removeContact);

router.put("/contacts/:contactId", validateBody(contactsSchema), updateContact);

module.exports = router;
