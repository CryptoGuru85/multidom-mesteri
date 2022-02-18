import { Theme, ThemeOptions } from "@mui/material/styles";

// const CardOverride: ThemeOptions["components"] = {
//   MuiCardHeader: {
//     styleOverrides: {
//       title: ({ theme }) => ({
//         fontFamily: "Lato, sans-serif",
//         padding: 0,
//         margin: 0,
//         "& h4": {
//           fontSize: 32,
//           marginBottom: 12,
//           lineHeight: "25px",
//           color: theme.palette.text.primary,
//         },
//       }),
//       subheader: ({ theme }) => ({
//         fontSize: 12,
//         fontFamily: "Lato, sans-serif",
//         color: theme.palette.grey.A700,
//       }),
//     },
//   },
// };

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
