import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContartList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import "./App.css";

const initialContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const loadContactsFromLocalStorage = () => {
  const savedContacts = localStorage.getItem("contacts");
  return savedContacts ? JSON.parse(savedContacts) : initialContacts;
};

const saveContactsToLocalStorage = (contacts) => {
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

const App = () => {
  const [contacts, setContacts] = useState(loadContactsFromLocalStorage);
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
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} />
      <SearchBox value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </div>
  );
};

export default App;
