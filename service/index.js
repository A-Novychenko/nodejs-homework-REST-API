const Contact = require("./schemas/contact");

const listContacts = async () => Contact.find();

const getContactById = async (contactId) => Contact.findById(contactId);

const removeContact = async (contactId) => Contact.findByIdAndDelete(contactId);

const addContact = async (data) => Contact.create(data);

const updateContact = async (contactId, data) =>
  Contact.findByIdAndUpdate(contactId, data, {new: true});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
