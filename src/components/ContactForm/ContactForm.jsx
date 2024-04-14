import css from './ContactForm.module.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactsBoxSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .required('Required!'),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, {
      message: 'Invalid number',
      excludeEmptyString: false,
    })
    .required('Required!'),
});

const initialValues = {
  name: '',
  number: '',
};

export default function ContactForm ({ onAddNewContact }) {
  const handleSubmit = (data, formActions) => {
    onAddNewContact(data);
    formActions.resetForm();
  };

  return (
    <Formik
      validationSchema={ContactsBoxSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <span className={css.text}>Name</span>
          <Field
            className={css.field}
            type="text"
            name="name"
          />
          <ErrorMessage
            className={css.error}
            name="name"
            component="span"
          />
        </label>

        <label className={css.label}>
          <span className={css.text}>Number</span>
          <Field
            className={css.field}
            type="text"
            name="number"
          />
          <ErrorMessage
            className={css.error}
            name="number"
            component="span"
          />
        </label>

        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

