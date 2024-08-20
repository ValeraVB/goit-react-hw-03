import { useState } from "react";
import "./ContactForm.css";

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: `id-${Date.now()}`,
      name,
      number,
    };
    onAddContact(newContact);
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="number">Number</label>
        <input
          id="number"
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
