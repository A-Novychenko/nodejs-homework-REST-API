const Contact = require("./schemas/contact");

const listContacts = async () => Contact.find();

// const getContactById = async (contactId) => Contact.findById(contactId);
const getContactById = async (contactId) => Contact.findById({_id: contactId});

const removeContact = async (contactId) => Contact.findByIdAndRemove(contactId);

const addContact = async (fields) => Contact.create(fields);

const updateContact = async (contactId, fields) =>
  Contact.findByIdAndUpdate(contactId, fields, {new: true});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
