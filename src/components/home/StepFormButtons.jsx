import { Button, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const StepFormButtons = ({ showSteps, myStep, totalSteps, onPrev, onNext }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ gap: 3, mt: 2 }}>
    <Typography variant="subtitle2">
      {showSteps && `Steps ${myStep} of ${totalSteps}`}
    </Typography>
    <Box>
      {myStep > 1 && onPrev && (
        <Button
          variant="text"
          color="primary"
          size="large"
          onClick={onPrev}
        >
          Previous
        </Button>
      )}
      {onNext && (
      <Button
        variant={myStep < totalSteps ? "outlined" : "contained"}
        color="primary"
        size="large"
        onClick={onNext}
      >
        {myStep < totalSteps ? "Next" : "Submit"}
      </Button>
      )}
    </Box>
  </Box>
);

StepFormButtons.propTypes = {
  myStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  showSteps: PropTypes.bool,
};

StepFormButtons.defaultProps = {
  showSteps: false,
  onNext: null,
  onPrev: null,
};

export default StepFormButtons;
