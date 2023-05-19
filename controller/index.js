const contactsService = require("../service");
const {controllerWrapper} = require("../decorators");

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
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found contsct id: ${contactId}`,
      data: "Not Found",
    });
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
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: "Not Found",
    });
  }

  res.json({status: "success", code: 200, data: {contact: result}});
};

const updateContact = async (req, res) => {
  const {contactId} = req.params;

  const result = await contactsService.updateContact(contactId, req.body);

  if (!result) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: "Not Found",
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {contact: result},
  });
};

const updateStatusContact = async (req, res) => {
  const {contactId} = req.params;
  console.log("req.body", req.body.favorite);

  if (req.body.favorite === undefined) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing field favorite",
      data: "Not Found",
    });
  }

  const {favorite = false} = req.body;

  const result = await contactsService.updateContact(contactId, {favorite});

  if (!result) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: "Not Found",
    });
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
