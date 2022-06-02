export type InitStatus =
  | "INITIALIZED"
  | "INITIALIZING"
  | "NOT_INITIALIZED"
  | "INITIALIZATION_ERROR";
export type Price = { id: number; price: number; date: string };
export type Product = { id: number; name: string };
export type AppCtxState = {
  products: Product[];
  prices: Record<string, Price[]>;
  initializeStatus: InitStatus;
};

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
