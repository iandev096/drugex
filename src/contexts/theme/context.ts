import { createContext } from "react";
import { ThemeCtxState } from "./types";

export const initialCtx: ThemeCtxState = { darkMode: false, setDarkMode: () => {} };

const ThemeCtx = createContext<ThemeCtxState>(initialCtx);

export default ThemeCtx;
