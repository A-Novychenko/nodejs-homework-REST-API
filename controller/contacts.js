const {controllerWrapper} = require("../helpers");
const {HttpError} = require("../helpers");
const {Contact} = require("../models/contact");

const getAllContacts = async (req, res) => {
  const {_id: owner} = req.user;
  const {page = 1, limit = 20, favorite} = req.query;
  const skip = (page - 1) * limit;
  const filter = favorite === undefined ? null : {favorite};

  const result = await Contact.find(
    {owner, ...filter},
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription");

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
  const {email, phone} = req.body;

  const {_id: id} = req.user;
  const emailIsOnTheList = await Contact.findOne({email});
  const contactIsOnTheList = await Contact.findOne({phone});

  if (emailIsOnTheList?.owner === id || contactIsOnTheList?.owner === id) {
    throw HttpError(
      409,
      `There is already a contact with this email ${email} or phone number ${phone} `
    );
  }

  const {_id: owner} = req.user;
  const result = await Contact.create({...req.body, owner});
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
