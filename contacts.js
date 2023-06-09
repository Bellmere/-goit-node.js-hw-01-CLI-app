const fs = require("fs/promises");
const path = require('path');
const {v4} = require('uuid');



const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    return contacts;
  }
  
async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    if (!contact) {
        return null;
    }
    return contact;
  }
  
async function removeContact(contactId) {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    const newContacts = contacts.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contacts[idx];
  }
  
async function addContact(name, email, phone) {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    const data = {name, email, phone};
    const id = v4();
    const newContact = {id, ...data};
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}