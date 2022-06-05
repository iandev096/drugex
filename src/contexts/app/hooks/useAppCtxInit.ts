import { useEffect } from "react";
import AppCtxAction from "../action";
import { initialCtxState } from "../context";
import { AppCtxState, Price, Product, ResponseData } from "../type";
import { fetchProducts, getStoredState } from "../util";

export default function useAppCtxInit(
  state: AppCtxState,
  dispatch: React.Dispatch<AppCtxAction>
) {
  useEffect(function handleInit() {
    if (state.initializeStatus !== "NOT_INITIALIZED") {
      return;
    }

    dispatch({
      type: "SET_INIT_STATUS",
      payload: { status: "INITIALIZING" },
    });

    async function fromRemote() {
      try {
        const res = await fetchProducts();
        const data = res.data as ResponseData;

        const state_ = data.products.reduce<AppCtxState>((acc, cur) => {
          const product: Product = { id: cur.id, name: cur.name };
          const prices: Price[] = cur.prices;
          acc.products.push(product);
          acc.prices[cur.id] = prices;
          acc.lastProductId += 1;
          return acc;
        }, initialCtxState);

        dispatch({ type: "INIT", payload: { state: state_ } });

        dispatch({
          type: "SET_INIT_STATUS",
          payload: { status: "INITIALIZED" },
        });
      } catch (_) {
        throw new Error("Initialization error");
      }
    }

    async function init() {
      try {
        const state_ = await getStoredState();

        if (state_?.initializeStatus === "INITIALIZED") {
          dispatch({ type: "INIT", payload: { state: state_ } });
        } else {
          await fromRemote();
        }
      } catch (_) {
        dispatch({
          type: "SET_INIT_STATUS",
          payload: { status: "INITIALIZATION_ERROR" },
        });
      }
    }

    init();
  }, []);
}
