import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red, grey } from "@mui/material/colors";

const customTheme = {
  custom: {
    glassBackground: {
      backgroundColor: "#212121E5",
      backdropFilter: "blur(10px)",
    },
    elevation: {
      0: "linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03))",
      1: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
      2: "linear-gradient(rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07))",
      3: "linear-gradient(rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08))",
      4: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
      6: "linear-gradient(rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11))",
      8: "linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12))",
      12: "linear-gradient(rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.14))",
      16: "linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15))",
      24: "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))",
    },
  },
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: grey[50],
      main: grey[200],
      dark: grey[500],
    },
    secondary: red,
  },
  breakpoints: {
    keys: ["xxs", "xs", "sm", "md", "lg", "xl"],
    values: {
      xxs: 0,
      xs: 700,
      sm: 850,
      md: 1000,
      lg: 1280,
      xl: 1600,
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 3,
      },
    },
    MuiChip: {
      styleOverrides: {
        icon: {
          color: "inherit",
          fontSize: "inherit",
          marginRight: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#212121",
        },
      },
    },
    MuiButton: {},
    MuiGrid: {
      defaultProps: {},
      variants: [
        {
          props: {
            item: true,
          },
          style: {
            maxWidth: "100%",
            flexBasis: "100%",
          },
        },
      ],
    },
  },
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    h1: {
      fontWeight: 700,
      lineHeight: "135%",
    },
    h2: {
      fontWeight: 500,
      lineHeight: "135%",
    },
    h3: {
      fontWeight: 600,
      lineHeight: "135%",
    },
    h4: {
      fontWeight: 700,
      lineHeight: "135%",
    },
    h5: {
      fontWeight: 500,
      lineHeight: "135%",
    },
    h6: {
      fontWeight: 700,
      lineHeight: "135%",
    },
    subtitle1: {
      fontWeight: 700,
      lineHeight: "150%",
    },
    subtitle2: {
      fontWeight: 600,
      lineHeight: "150%",
    },
    body1: {
      lineHeight: "150%",
    },
    body2: {
      lineHeight: "150%",
    },
    button: {
      fontWeight: 600,
      lineHeight: "150%",
      textTransform: "none",
    },
    caption: {},
    overline: {},
  },
  ...customTheme,
});

export default responsiveFontSizes(theme, {
  disableAlign: true,
});
