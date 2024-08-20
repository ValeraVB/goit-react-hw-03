import { Person, Phone, Delete } from "@mui/icons-material";
import "./Contact.css";

const Contact = ({ name, number, onDelete, id }) => {
  return (
    <li className="contact-item">
      <div className="contact-details">
        <div className="contact-detail">
          <Person className="contact-icon" /> {/* Иконка для имени */}
          <span>{name}</span>
        </div>
        <div className="contact-detail">
          <Phone className="contact-icon" /> {/* Иконка для номера */}
          <span>{number}</span>
        </div>
      </div>
      <button className="delete-button" onClick={() => onDelete(id)}>
        <Delete className="delete-icon" /> {/* Иконка для удаления */}
        Delete
      </button>
    </li>
  );
};

export default Contact;
