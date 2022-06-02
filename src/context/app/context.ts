import { createContext } from "react";
import { AppCtxState } from "./type";

export const initialCtxState: AppCtxState = {
  products: [],
  prices: {},
  initializeStatus: "NOT_INITIALIZED",
};

const AppCtx = createContext<Record<string, any>>(initialCtxState);

export default AppCtx;
