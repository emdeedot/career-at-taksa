import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PropTypes from "prop-types";
import palette from "./palette";
import shadows from "./shadows";
import components from "./components";
import typography from "./typography";

const theme = createTheme({
  palette,
  shadows,
  components,
  typography,
});

const ThemedApp = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

ThemedApp.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemedApp;
