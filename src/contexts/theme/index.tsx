import React, { memo, useEffect, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import theme, { darkTheme } from "../../../theme";
import ThemeCtx, { initialCtx } from "./context";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

function AppThemeProvider({ children }: Props) {
  const [appTheme, setAppTheme] = useState(theme);
  const [darkMode, setDarkMode] = useState(initialCtx.darkMode);

  useEffect(
    function handleMode() {
      if (darkMode) {
        setAppTheme(darkTheme);
      } else {
        setAppTheme(theme);
      }
    },
    [darkMode]
  );

  return (
    <ThemeCtx.Provider value={{darkMode, setDarkMode}}>
      <PaperProvider theme={appTheme}>{children}</PaperProvider>
    </ThemeCtx.Provider>
  );
}

export default memo(AppThemeProvider);
