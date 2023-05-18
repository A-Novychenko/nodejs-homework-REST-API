const express = require("express");

const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../controller");

const {contactsSchema} = require("../schemas");
const {validateBody} = require("../decorators");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(contactsSchema), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateBody(contactsSchema), updateContact);

module.exports = router;
