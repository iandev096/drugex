import { useCallback, useContext } from "react";
import ThemeCtx from "../context";

export default function useDarkMode() {
  const { darkMode, setDarkMode } = useContext(ThemeCtx);

  const toggle = useCallback(() => setDarkMode(!darkMode), [darkMode]);

  return { darkMode, toggle };
}
