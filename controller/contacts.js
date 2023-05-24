const {controllerWrapper} = require("../helpers");
const {HttpError} = require("../helpers");
const {Contact} = require("../models/contact");

const getAllContacts = async (_, res) => {
  const result = await Contact.find();
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

  const result = await Contact.findById(contactId);

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
  const result = await Contact.create(req.body);
  res.status(201).json({status: "success", code: 201, data: {contact: result}});
};

const removeContact = async (req, res) => {
  const {contactId} = req.params;

  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, `Not found contacts id: ${contactId}`);
  }

  res.json({status: "success", code: 200, data: {contact: result}});
};

const updateContact = async (req, res) => {
  const {contactId} = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
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

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

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