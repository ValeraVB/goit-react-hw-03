import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContartList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import initialContacts from "./data/contacts.json";
import styles from "./App.module.css";

const loadContactsFromLocalStorage = () => {
  const savedContacts = localStorage.getItem("contacts");
  return savedContacts ? JSON.parse(savedContacts) : initialContacts;
};

const saveContactsToLocalStorage = (contacts) => {
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

const App = () => {
  const [contacts, setContacts] = useState(() =>
    loadContactsFromLocalStorage()
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    saveContactsToLocalStorage(contacts);
  }, [contacts]);

  const addContact = (contact) => {
    setContacts((prevContacts) => [contact, ...prevContacts]);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDeleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} />
      <SearchBox value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </div>
  );
};

export default App;
