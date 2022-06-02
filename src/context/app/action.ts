import { AppCtxState, InitStatus } from "./type";

export type Initialize = { type: "INIT"; payload: { state: AppCtxState } };
export type SetInitStatus = {
  type: "SET_INIT_STATUS";
  payload: { status: InitStatus };
};
export type RemoveProduct = { type: "REMOVE_PRODUCT"; payload: { id: number } };
export type AddProduct = {
  type: "ADD_PRODUCT";
  payload: { name: string; price: number };
};
export type ModifyProduct = {
  type: "MODIFY_PRODUCT";
  payload: { id: number; name: string; price: number };
};

type AppCtxAction =
  | RemoveProduct
  | AddProduct
  | ModifyProduct
  | Initialize
  | SetInitStatus;

export default AppCtxAction;
