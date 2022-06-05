import React, { useMemo } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AppStack from "./app";
import useAppTheme from "../hooks/useAppTheme";
import useDarkMode from "../contexts/theme/hooks/useDarkMode";

export default function App() {
  const {
    colors: { primary, background, text },
  } = useAppTheme();
  const {darkMode} = useDarkMode();

  const navTheme = useMemo(() => {
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: background,
        background: background,
        card: primary,
        text: darkMode ? text : background,
        border: background,
      },
    };
  }, [primary, background]);

  return (
    <NavigationContainer theme={navTheme}>
      <AppStack />
    </NavigationContainer>
  );
}
