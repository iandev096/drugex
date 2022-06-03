import React, { useMemo } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AppStack from "./app";
import useAppTheme from "../hooks/useAppTheme";

export default function App() {
  const {
    colors: { primary, background, text },
  } = useAppTheme();

  const navTheme = useMemo(() => {
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: background,
        background: background,
        card: primary,
        text: background,
        border: background,
      },
    };
  }, []);

  return (
    <NavigationContainer theme={navTheme}>
      <AppStack />
    </NavigationContainer>
  );
}
