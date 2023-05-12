const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");
const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);

  return JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find(({id}) => id === contactId);

  return contact || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(({id}) => id === contactId);
  if (idx === -1) {
    return null;
  }
  const [deletedContact] = allContacts.splice(idx, 1);
  updateContacts(allContacts);

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
  updateContacts(allContacts);

  return newContact;
};

const updateContact = async (contactId, data) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(({id}) => id === contactId);
  if (idx === -1) {
    return null;
  }
  allContacts[idx] = {id: contactId, ...data};
  updateContacts(allContacts);

  return allContacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
