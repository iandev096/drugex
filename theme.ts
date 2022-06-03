import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0A192F",
    border: "#FFF",
  },
};

export type Theme = typeof theme;

export default theme;
