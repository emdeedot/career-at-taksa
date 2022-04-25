import PropTypes from "prop-types";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { forwardRef } from "react";
import { Box } from "@mui/material";

const Page = forwardRef(({ children, title }, ref) => (
  <Box
    component="main"
    ref={ref}
    sx={{
      maxWidth: "100%",
      mx: "auto",
      mb: 2,
      p: 3,
    }}
  >
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </HelmetProvider>
    {children}
  </Box>

));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Page;
