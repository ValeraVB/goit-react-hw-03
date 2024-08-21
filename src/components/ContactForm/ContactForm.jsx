import { useFormik, Field, FormikProvider } from "formik";
import * as Yup from "yup";
import { useId } from "react";
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
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Name is required"),
      number: Yup.string()
        .required("Number is required")
        .matches(/^\d+$/, "Number must be digits only")
        .min(5, "Number is too short!")
        .max(20, "Number is too long!"),
    }),
    validateOnChange: true, // Валідація при зміні поля
    validateOnBlur: true, // Валідація при втраті фокусу
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

  // Генерація унікальних ID для полів форми
  const nameId = useId();
  const numberId = useId();

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="contact-form">
        <div className="input-group">
          <label htmlFor={nameId}>Name</label>
          <Field
            id={nameId}
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
          <label htmlFor={numberId}>Number</label>
          <Field
            id={numberId}
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
