import { useFormik, Field, FormikProvider } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import "./ContactForm.css";

const ContactForm = ({ onAddContact }) => {
  // Ініціалізація Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .required("Name is required"),
      number: Yup.string()
        .required("Number is required")
        .matches(/^\d+$/, "Number must be digits only")
        .min(3, "Number is too short!")
        .max(50, "Number is too long!"),
    }),
    validateOnChange: true, // Валідація при зміні поля
    validateOnBlur: true, // Валідація при втраті фокусу
    onSubmit: (values, { resetForm }) => {
      const newContact = {
        id: nanoid(), // Генерація унікального ідентифікатора
        name: values.name,
        number: values.number,
      };
      onAddContact(newContact);
      resetForm();
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="contact-form">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <Field
            id="name"
            name="name"
            type="text"
            required
            className={
              formik.touched.name && formik.errors.name ? "error-field" : ""
            }
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="input-group">
          <label htmlFor="number">Number</label>
          <Field
            id="number"
            name="number"
            type="tel"
            required
            className={
              formik.touched.number && formik.errors.number ? "error-field" : ""
            }
            {...formik.getFieldProps("number")}
          />
          {formik.touched.number && formik.errors.number ? (
            <div className="error">{formik.errors.number}</div>
          ) : null}
        </div>
        <button type="submit">Add Contact</button>
      </form>
    </FormikProvider>
  );
};

export default ContactForm;
