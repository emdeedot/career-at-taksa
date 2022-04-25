import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormControl,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useEffect, cloneElement } from "react";

const ProfessionalDetailsForm = ({
  onSave,
  initialvalues,
  autoSave,
  onNext,
  buttons,
}) => {
  const form = useFormik({
    initialValues: {
      live_in_us: initialvalues.live_in_us,
      git_profile: initialvalues.git_profile,
      about_you: initialvalues.about_you,
    },
    validationSchema: Yup.object({
      live_in_us: Yup.boolean().nullable().required("Please select an answer"),
      git_profile: Yup.string().url("This is not a valid git profile URL").required("Git profile is required"),
      about_you: Yup.string().required("This field is required"),
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

  const handleBooleanChange = (event) => {
    form.setFieldValue(event.target.name, event.target.checked);
  };
  const handleBooleanChangeInverse = (event) => {
    form.setFieldValue(event.target.name, !event.target.checked);
  };

  return (
    <form onSubmit={form.handleSubmit}>
      <TextField
        error={Boolean(form.touched.git_profile && form.errors.git_profile)}
        fullWidth
        helperText={form.touched.git_profile && form.errors.git_profile}
        label="Git profile *"
        margin="normal"
        name="git_profile"
        onBlur={form.handleBlur}
        onChange={form.handleChange}
        type="text"
        value={form.values.git_profile}
        variant="outlined"
      />

      <FormControl
        error={Boolean(form.touched.live_in_us && form.errors.live_in_us)}
        sx={{
          my: 1,
        }}
      >
        <FormLabel component="legend">Do you live in the US? * </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={(
              <Checkbox
                checked={Boolean(form.values.live_in_us)}
                onChange={handleBooleanChange}
                name="live_in_us"
              />
            )}
            label="Yes"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={typeof form.values.live_in_us === "boolean" ? !form.values.live_in_us : false}
                onChange={handleBooleanChangeInverse}
                name="live_in_us"
              />
            )}
            label="No"
          />
        </FormGroup>
        <FormHelperText sx={{ mt: 0 }}>{form.touched.live_in_us && form.errors.live_in_us}</FormHelperText>
      </FormControl>

      <TextField
        error={Boolean(form.touched.about_you && form.errors.about_you)}
        fullWidth
        helperText={form.touched.about_you && form.errors.about_you}
        multiline
        rows={3}
        label="About you *"
        margin="normal"
        name="about_you"
        onBlur={form.handleBlur}
        onChange={form.handleChange}
        type="text"
        value={form.values.about_you}
        variant="outlined"
      />

      {buttons && cloneElement(buttons, { onNext: form.handleSubmit })}
    </form>
  );
};

ProfessionalDetailsForm.propTypes = {
  autoSave: PropTypes.bool,
  onSave: PropTypes.func,
  onNext: PropTypes.func.isRequired,
  buttons: PropTypes.node,
  initialvalues: PropTypes.shape({
    live_in_us: PropTypes.bool,
    git_profile: PropTypes.string,
    about_you: PropTypes.string,
  }).isRequired,
};

ProfessionalDetailsForm.defaultProps = {
  autoSave: false,
  onSave: null,
  buttons: null,
};
export default ProfessionalDetailsForm;
