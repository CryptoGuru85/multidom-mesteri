import { Theme, ThemeOptions } from "@mui/material/styles";

const ButtonOverride = (theme: Theme): ThemeOptions["components"] => ({
  MuiButton: {
    defaultProps: {
      size: "medium",
    },
    styleOverrides: {
      sizeSmall: {
        paddingBottom: 6,
        paddingTop: 6,
        paddingRight: 16,
        paddingLeft: 16,
      },
      sizeMedium: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 26,
        paddingRight: 26,
      },
      sizeLarge: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 30,
        paddingRight: 30,
      },
      root: {
        textTransform: "none",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 400,
        letterSpacing: 0.2,
      },
    },
  },
});

export default ButtonOverride;
