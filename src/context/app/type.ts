export type InitStatus =
  | "INITIALIZED"
  | "INITIALIZING"
  | "NOT_INITIALIZED"
  | "INITIALIZATION_ERROR";
export type Price = { id: number; price: number; date: string };
export type Product = { id: number; name: string };
export interface AppCtxState {
  products: Product[];
  prices: Record<string, Price[]>;
  removed: Product[];
  initializeStatus: InitStatus;
  lastProductId: number;
}
export interface AppCtxFull {
  state: AppCtxState;
  addProduct: (name: string, price: number) => any;
  removeProduct: (id: number) => any;
  modifyProduct: (id: number, name: string, price: number) => any;
}

interface PriceRes {
  id: number;
  price: number;
  date: string;
}
interface ProductRes {
  id: number;
  name: string;
  prices: PriceRes[];
}
export interface ResponseData {
  products: ProductRes[];
}
