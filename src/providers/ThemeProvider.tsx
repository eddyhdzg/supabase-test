import { CssBaseline, ThemeProvider as MUIThemeProvider } from "@mui/material";
import theme from "theme/theme";

const ThemeProvider: React.FC = ({ children }) => {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
