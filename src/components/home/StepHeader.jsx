import { Typography, Box, Stack, Icon } from "@mui/material";
import PropTypes from "prop-types";

const StepHeader = ({ isActive, title, icon }) => (
  <Box
    flexGrow={1}
    sx={{
      py: 1,
      borderBottom: 4,
      borderColor: isActive ? "primary.main" : "primary.light",
    }}
  >
    <Stack direction="row" alignItems="start" gap={1}>
      <Icon fontSize="small" color="primary">
        {icon}
      </Icon>
      <Typography fontWeight={600} variant="h6" color="primary" component="span">
        {title}
      </Typography>
    </Stack>
  </Box>
);

StepHeader.propTypes = {
  isActive: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default StepHeader;
