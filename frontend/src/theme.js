import { createTheme } from "@mui/material/styles";

const {
  palette: { augmentColor },
} = createTheme();

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1200,
    },
  },
  palette: {
    primary: augmentColor({
      color: {
        main: "#2b2322",
      },
    }),
    secondary: augmentColor({
      color: {
        main: "#1e4a8d",
      },
    }),
    background: {
      paper: "#FFFFFF",
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          textTransform: "none !important",
          letterSpacing: 10,
        },
      },
    },
  },
});

export default theme;
