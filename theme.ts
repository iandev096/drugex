import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0A192F",
    border: "#FFF",
  },
};

export const darkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2A4574',
    background: '#0A192F',
    border: "rgba(255,255,255,0.1)",
    text: '#DBFFF6',
    placeholder: '#2A4574',
  },
};

export type Theme = typeof theme;

export default theme;
