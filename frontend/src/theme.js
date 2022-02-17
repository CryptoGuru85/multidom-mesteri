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
  typography: {
    subtitle1: {
      weight: 600,
    },
  },
});
theme.props = {
  MuiButton: {
    root: {
      textTransform: "none",
      disableRipple: true,
      disableElevation: true,
      borderRadius: 0,
    },
  },
};
export default theme;
