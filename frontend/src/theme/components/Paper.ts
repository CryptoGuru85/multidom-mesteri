import { Theme, ThemeOptions } from "@mui/material/styles";

const PaperOverride = (theme: Theme): ThemeOptions["components"] => ({
  MuiPaper: {
    defaultProps: {
      elevation: 0,
      variant: "elevation",
    },

    variants: [
      {
        props: { variant: "outlined" },
        style: { borderColor: theme.palette.grey[500_12] },
      },
      {
        props: { variant: "elevation" },
        style: {},
      },
    ],

    styleOverrides: {
      root: {
        backgroundImage: "none",
      },
    },
  },
});

// declare module "@mui/material/Paper" {
//   interface PaperPropsVariantOverrides {
//     page: true;
//   }
// }

export default PaperOverride;
