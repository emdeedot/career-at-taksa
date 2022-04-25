import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useEffect, cloneElement } from "react";
import UploadInput from "../UploadInput";

const UploadsForm = ({
  onSave,
  initialvalues,
  autoSave,
  onNext,
  buttons,
}) => {
  const form = useFormik({
    initialValues: {
      cv: initialvalues.cv,
      cover_letter: initialvalues.cover_letter,
    },
    validationSchema: Yup.object({
      cv: Yup.mixed().required("CV is required"),
      cover_letter: Yup.mixed().optional(),
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

  const handleFileChange = (name, file) => {
    form.setFieldValue(name, file);
  };

  return (
    <form onSubmit={form.handleSubmit}>
      <UploadInput
        name="cv"
        value={form.values.cv}
        onChange={handleFileChange}
        label="Upload CV *"
        error={Boolean(form.touched.cv && form.errors.cv)}
        helperText={form.touched.cv && form.errors.cv}
      />

      <UploadInput
        name="cover_letter"
        value={form.values.cover_letter}
        onChange={handleFileChange}
        label="Upload cover letter"
        error={Boolean(form.touched.cover_letter && form.errors.cover_letter)}
        helperText={form.touched.cover_letter && form.errors.cover_letter}
      />
      {buttons && cloneElement(buttons, { onNext: form.handleSubmit })}
    </form>

  );
};

UploadsForm.propTypes = {
  autoSave: PropTypes.bool,
  onSave: PropTypes.func,
  onNext: PropTypes.func.isRequired,
  buttons: PropTypes.node,
  initialvalues: PropTypes.shape({
    cv: PropTypes.instanceOf(File),
    cover_letter: PropTypes.instanceOf(File),
  }).isRequired,
};

UploadsForm.defaultProps = {
  autoSave: false,
  onSave: null,
  buttons: null,
};
export default UploadsForm;
