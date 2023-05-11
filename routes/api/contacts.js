const express = require("express");
const contactsService = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const result = await contactsService.getContactById(id);
  res.json({result});
});

router.post("/", async (req, res, next) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  await contactsService.removeContact(id);
  res.json({message: "contact deleted"});
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const r = await contactsService.updateContact(id, req.body);
  res.status(200).json(r);
});

module.exports = router;
