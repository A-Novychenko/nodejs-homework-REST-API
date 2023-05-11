const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find(({id}) => id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(({id}) => id === contactId);
  if (idx === -1) {
    return null;
  }

  const [deletedContact] = allContacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deletedContact;
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};
const updateContact = async (contactId, {name, email, phone}) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(({id}) => id === contactId);

  if (idx === -1) {
    return null;
  }

  const updatedContact = {
    id: contactId,
    name,
    email,
    phone,
  };

  allContacts.splice(idx, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
