import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface Palette {
    neutral: Palette["primary"];
    backgroundPage: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
    backgroundPage: Palette["primary"];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }
}

export const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      light: "#ffcd0d",
      main: "#ffcd0d",
      dark: "#ffcd0d",
      contrastText: "#000",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffcd0d",
      main: "#00ffea",
      dark: "#ffcd0d",
      contrastText: "#000",
    },

    backgroundPage: {
      light: "#ffcd0d",
      main: "#00ffea",
      dark: "#ffcd0d",
      contrastText: "#000",
    },
  },
});
