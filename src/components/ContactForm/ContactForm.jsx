import { useFormik } from "formik";
import * as Yup from "yup";
import "./ContactForm.css";

const ContactForm = ({ onAddContact }) => {
  // Инициализация Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      number: Yup.string()
        .required("Number is required")
        .matches(/^\d+$/, "Number must be digits only"),
    }),
    onSubmit: (values, { resetForm }) => {
      const newContact = {
        id: `id-${Date.now()}`,
        name: values.name,
        number: values.number,
      };
      onAddContact(newContact);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="contact-form">
      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          required
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}
      </div>
      <div className="input-group">
        <label htmlFor="number">Number</label>
        <input
          id="number"
          name="number"
          type="tel"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.number}
          required
        />
        {formik.touched.number && formik.errors.number ? (
          <div className="error">{formik.errors.number}</div>
        ) : null}
      </div>
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
