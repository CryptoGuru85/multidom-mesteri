import { Theme, ThemeOptions } from "@mui/material/styles";

const CardOverride = (theme: Theme): ThemeOptions["components"] => ({
  MuiCard: {
    styleOverrides: {
      root: {
        position: "relative",
        boxShadow: theme.customShadows.card,
        borderRadius: Number(theme.shape.borderRadius) * 2,
        zIndex: 0, // Fix Safari overflow: hidden with border radius,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      },
    },
  },
  MuiCardHeader: {
    defaultProps: {
      titleTypographyProps: { variant: "h6" },
      subheaderTypographyProps: {
        variant: "body2",
        marginTop: theme.spacing(0.5),
      },
    },
    styleOverrides: {
      root: {
        padding: theme.spacing(3, 3, 0),
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: theme.spacing(3),
      },
    },
  },
});

export default CardOverride;
