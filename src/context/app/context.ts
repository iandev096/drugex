import { createContext } from "react";
import { AppCtxFull, AppCtxState } from "./type";

export const initialCtxState: AppCtxState = {
  products: [],
  prices: {},
  removed: [],
  initializeStatus: "NOT_INITIALIZED",
  lastProductId: 0,
};

export const initialCtx: AppCtxFull = {
  state: initialCtxState,
  addProduct: (name: string, price: number) => {},
  removeProduct: (id: number) => {},
  modifyProduct: (id: number, name: string, price: number) => {},
};

const AppCtx = createContext<AppCtxFull>(initialCtx);

export default AppCtx;
