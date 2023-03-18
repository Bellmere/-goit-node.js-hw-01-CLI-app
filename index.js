const argv = require("yargs").argv;

const contactsOperations = require('./contacts');
const { listContacts, getContactById, removeContact, addContact } = contactsOperations;

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.log(contacts);
        break;
  
      case "get":
        console.log(id);
        const contact = await getContactById(id.toString());
        if (!contact) {
            throw new Error(`Contact with such id=${id} not found`);
        }
        console.log(contact);
        break;
  
      case "add":
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
        break;
  
      case "remove":
        const removedContact = await removeContact(id.toString());
        console.log(removedContact);
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  }

  invokeAction(argv);