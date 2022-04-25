import { Typography, Box, Card, CardContent } from "@mui/material";
import PropTypes from "prop-types";

const FormBanner = ({ icon, title, action }) => (
  <Card
    sx={{
      maxWidth: "sm",
      mx: "auto",
    }}
    variant="outlined"
  >
    <CardContent sx={{ px: 4, py: 0 }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
        sx={{ textAlign: "center", p: 2, minHeight: 360 }}
      >
        {icon}
        <Typography variant="h6">{title}</Typography>
        {action}
      </Box>
    </CardContent>
  </Card>
);

FormBanner.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.node,
};

FormBanner.defaultProps = {
  action: null,
};

export default FormBanner;
