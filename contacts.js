const { uid } = require('uid');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

// function getContacts() {
//   const data = fs.readFile(contactsPath);
//   const contacts = JSON.parse(data);
//   return contacts;
// }

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    console.table(contacts);
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contact = JSON.parse(data).find(({ id }) => String(id) === contactId);

    console.table(contact);
    return contact;
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);

    const allContacts = JSON.parse(data).filter(
      ({ id }) => String(id) !== contactId,
    );

    const contacts = await fs.writeFile(
      contactsPath,
      JSON.stringify(allContacts),
    );

    listContacts();
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  const contact = {
    id: uid(),
    name,
    email,
    phone,
  };

  try {
    const data = await fs.readFile(contactsPath);

    const allContacts = JSON.parse(data);
    allContacts.push(contact);

    const contacts = await fs.writeFile(
      contactsPath,
      JSON.stringify(allContacts),
    );

    listContacts();
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
