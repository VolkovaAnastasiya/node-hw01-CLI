const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  if (!contacts) {
    return null;
  }
  return contacts;
}

async function getContactById(contactId) {
  const contactsArray = await listContacts();
  const result = contactsArray.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function addContact(name, email, phone) {
  const contactsArray = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contactsArray.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArray));
  if (!newContact) {
    return null;
  }
  return newContact;
}

async function removeContact(contactId) {
  const contactsArray = await listContacts();
  const indx = contactsArray.findIndex((contact) => contact.id === contactId);
  if (indx === -1) {
    return null;
  }
  const updatedContacts = contactsArray.filter((_, index) => index !== indx);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return contactsArray[indx];
}

module.exports = { listContacts, getContactById, addContact, removeContact };
