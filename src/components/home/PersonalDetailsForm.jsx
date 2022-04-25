import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useEffect, cloneElement } from "react";
import { phoneNumberRegex } from "../../config/phoneNumberValidation";

const PersonalDetailsForm = ({
  onSave,
  initialvalues,
  autoSave,
  onNext,
  buttons,
}) => {
  const form = useFormik({
    initialValues: {
      first_name: initialvalues.first_name,
      last_name: initialvalues.last_name,
      email: initialvalues.email,
      phone_number: initialvalues.phone_number,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().optional(),
      email: Yup.string().email("Email is not valid").required("Email is required"),
      phone_number: Yup.string().matches(phoneNumberRegex, "Phone number is not valid").optional(),
    }),
    onSubmit: (values) => {
      onNext(values);
    },
  });

  useEffect(() => {
    if (autoSave && autoSave) {
      onSave(form.values);
    }
  }, [autoSave, form.values]);

  return (
    <form onSubmit={form.handleSubmit}>
      <TextField
        id="first_name"
        error={Boolean(form.touched.first_name && form.errors.first_name)}
        fullWidth
        margin="normal"
        label="First name *"
        helperText={form.touched.first_name && form.errors.first_name}
        name="first_name"
        onBlur={form.handleBlur}
        onChange={form.handleChange}
        type="text"
        value={form.values.first_name}
        variant="outlined"
      />

      <TextField
        error={Boolean(form.touched.last_name && form.errors.last_name)}
        fullWidth
        helperText={form.touched.last_name && form.errors.last_name}
        label="Last name"
        margin="normal"
        name="last_name"
        onBlur={form.handleBlur}
        onChange={form.handleChange}
        type="text"
        value={form.values.last_name}
        variant="outlined"
      />

      <TextField
        error={Boolean(form.touched.email && form.errors.email)}
        fullWidth
        helperText={form.touched.email && form.errors.email}
        label="Email address *"
        margin="normal"
        name="email"
        onBlur={form.handleBlur}
        onChange={form.handleChange}
        type="email"
        value={form.values.email}
        variant="outlined"
      />

      <TextField
        error={Boolean(form.touched.phone_number && form.errors.phone_number)}
        fullWidth
        helperText={form.touched.phone_number && form.errors.phone_number}
        label="Phone number"
        margin="normal"
        name="phone_number"
        onBlur={form.handleBlur}
        onChange={form.handleChange}
        type="tel"
        value={form.values.phone_number}
        variant="outlined"
      />
      {buttons && cloneElement(buttons, { onNext: form.handleSubmit })}
    </form>
  );
};

PersonalDetailsForm.propTypes = {
  autoSave: PropTypes.bool,
  onSave: PropTypes.func,
  onNext: PropTypes.func.isRequired,
  buttons: PropTypes.node,
  initialvalues: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
  }).isRequired,
};

PersonalDetailsForm.defaultProps = {
  autoSave: false,
  onSave: null,
  buttons: null,
};

export default PersonalDetailsForm;
