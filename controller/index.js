const contactsService = require("../service");
const {HttpError} = require("../helpers");
const {controllerWrapper} = require("../decorators");

const getAllContacts = async (_, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const {contactId} = req.params;
  const result = await contactsService.getContactById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const {contactId} = req.params;
  const result = await contactsService.removeContact(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({message: "contact deleted"});
};

const updateContact = async (req, res) => {
  const {contactId} = req.params;

  const result = await contactsService.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  removeContact: controllerWrapper(removeContact),
  updateContact: controllerWrapper(updateContact),
};
