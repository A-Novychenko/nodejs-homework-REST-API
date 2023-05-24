const contactsService = require("../service");
const {controllerWrapper} = require("../helpers");
const {HttpError} = require("../helpers");

const getAllContacts = async (_, res) => {
  const result = await contactsService.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts: result,
    },
  });
};

const getContactById = async (req, res) => {
  const {contactId} = req.params;

  const result = await contactsService.getContactById(contactId);

  if (!result) {
    throw HttpError(404, `Not found contacts id: ${contactId}`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {contact: result},
  });
};

const addContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json({status: "success", code: 201, data: {contact: result}});
};

const removeContact = async (req, res) => {
  const {contactId} = req.params;

  const result = await contactsService.removeContact(contactId);

  if (!result) {
    throw HttpError(404, `Not found contacts id: ${contactId}`);
  }

  res.json({status: "success", code: 200, data: {contact: result}});
};

const updateContact = async (req, res) => {
  const {contactId} = req.params;

  const result = await contactsService.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Not found contacts id: ${contactId}`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {contact: result},
  });
};

const updateStatusContact = async (req, res) => {
  const {contactId} = req.params;

  const result = await contactsService.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, `Not found contacts id: ${contactId}`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {contact: result},
  });
};

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  removeContact: controllerWrapper(removeContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
