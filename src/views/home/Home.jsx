import { Typography, Box, CircularProgress, Button } from "@mui/material";
import { useState } from "react";
import { Person, Work, Upload, CheckCircle, Cancel } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Page from "../../components/Page";
import StepHeader from "../../components/home/StepHeader";
import PersonalDetailsForm from "../../components/home/PersonalDetailsForm";
import ProfessionalDetailsForm from "../../components/home/ProfessionalDetailsForm";
import UploadsForm from "../../components/home/UploadsForm";
import StepForm from "../../components/home/StepForm";
import FormBanner from "../../components/home/FormBanner";

const Home = () => {
  const formValues = useSelector((state) => state.applicationFormdata);
  const dispatch = useDispatch();
  const setFormValues = (values) => dispatch({ type: "APPLICATION_FORMDATA", payload: values });
  const totalSteps = 3;
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const submitForm = () => {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(formValues).forEach(([name, value]) => {
      formData.append(name, value);
    });
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (!response.ok) {
        let message = "Something went wrong";
        if (response.status > 400 && response.status < 500) {
          message = "Please check your form for errors";
        }
        if (response.status > 500) {
          message = "Something went wrong on our end";
        }
        setHttpError({ message });
      }
    }).catch((error) => {
      setHttpError(error);
    }).finally(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    });
  };

  const onSave = (values) => {
    setFormValues({ ...formValues, ...values });
  };

  const onPrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const tryAgain = () => {
    setIsSubmitted(false);
    setHttpError(null);
  };

  const onNext = async (values) => {
    // Update values in case autoSave is not enabled
    setFormValues({ ...formValues, ...values });

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Form last step submit the form
      await submitForm();
    }
  };

  return (
    <Page title="Home">
      <Typography variant="h4" textAlign="center">Work at Taksa</Typography>
      <Typography variant="body2" textAlign="center">Fill the below form to apply at our organization</Typography>

      <Box display="flex" justifyContent="flex-start" sx={{ gap: 0.5, my: 2, mx: "auto", maxWidth: "sm" }}>
        <StepHeader isActive={currentStep >= 1} title="Personal Details" icon={<Person />} />
        <StepHeader isActive={currentStep >= 2} title="Professional details" icon={<Work />} />
        <StepHeader isActive={currentStep >= 3} title="Uploads" icon={<Upload />} />
      </Box>
      {isSubmitting && (
        <FormBanner icon={<CircularProgress fontSize="large" />} title="Submitting..." />
      )}
      {isSubmitted && !httpError && (
        <FormBanner
          icon={<CheckCircle fontSize="large" color="success" />}
          title="Form submitted successfully!"
        />
      )}
      {isSubmitted && httpError && (
        <FormBanner
          icon={<Cancel fontSize="large" color="error" />}
          action={<Button onClick={tryAgain}>Try again</Button>}
          title={httpError.message}
        />
      )}
      {!isSubmitted && !isSubmitting && (
        <>
          {currentStep === 1 && (
            <StepForm
              title="Personal Details"
              onNext={onNext}
              autoSave
              showSteps
              onSave={onSave}
              myStep={1}
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrev={onPrev}
              initialvalues={formValues}
              form={PersonalDetailsForm}
            />
          )}
          {currentStep === 2 && (
            <StepForm
              title="Professional Details"
              onNext={onNext}
              autoSave
              showSteps
              onSave={onSave}
              myStep={2}
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrev={onPrev}
              initialvalues={formValues}
              form={ProfessionalDetailsForm}
            />
          )}
          {currentStep === 3 && (
            <StepForm
              title="Updates"
              onNext={onNext}
              autoSave
              showSteps
              onSave={onSave}
              myStep={3}
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrev={onPrev}
              initialvalues={formValues}
              form={UploadsForm}
            />
          )}
        </>
      )}

    </Page>
  );
};

export default Home;
