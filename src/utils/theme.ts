"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#B969FD",
    },
    secondary: {
      main: "#E5E4E2",
    },
    background: {
      default: "#151515",
      paper: "#393E41",
    },
  },
  typography: {
    fontFamily: [
      '"Roboto Mono Variable"',
      '"Roboto Mono"',
      "Sono Variable",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default theme;
