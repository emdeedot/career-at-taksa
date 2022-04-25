import { Card, CardContent, CardHeader } from "@mui/material";
import PropTypes from "prop-types";
import StepFormButtons from "./StepFormButtons";

const StepForm = ({
  title,
  form,
  onSave,
  onNext,
  onPrev,
  myStep,
  currentStep,
  totalSteps,
  initialvalues,
  showSteps,
  autoSave }) => (
    <Card
      sx={{
        maxWidth: "sm",
        mx: "auto",
      }}
      variant="outlined"
    >
      <CardHeader
        sx={{
          px: 4,
          pt: 2,
          pb: 0,
        }}
        title={title}
        titleTypographyProps={{
          variant: "h5",
        }}
      />
      <CardContent sx={{ px: 4, py: 0 }}>
        {form({
          onSave,
          autoSave,
          onNext,
          initialvalues,
          buttons: (
            <StepFormButtons
              onPrev={onPrev}
              myStep={myStep}
              currentStep={currentStep}
              totalSteps={totalSteps}
              showSteps={showSteps}
            />
          ),
        })}
      </CardContent>
    </Card>
);

StepForm.propTypes = {
  title: PropTypes.string.isRequired,
  form: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  autoSave: PropTypes.bool,
  showSteps: PropTypes.bool,
  onPrev: PropTypes.func,
  onSave: PropTypes.func,
  myStep: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  // Rule disabled since this will be reusable component, so the shape of formValues is not predictable
  // eslint-disable-next-line react/forbid-prop-types
  initialvalues: PropTypes.object.isRequired,
};

StepForm.defaultProps = {
  autoSave: false,
  showSteps: false,
  onPrev: null,
  onSave: null,
};

export default StepForm;
