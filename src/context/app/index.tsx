import React, { memo, useCallback, useEffect, useReducer } from "react";
import AppCtx, { initialCtxState } from "./context";
import AppCtxReducer from "./reducer";
import { AppCtxState, Price, Product, ResponseData } from "./type";
import { fetchProducts, getStoredState } from "./util";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

function AppCtxProvider({ children }: Props) {
  const [state, dispatch] = useReducer(AppCtxReducer, initialCtxState);

  useEffect(
    function handleContextChanges() {
      console.log(
        "from handle context changes",
        JSON.stringify(state, null, " ")
      );
    },
    [state]
  );

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

        const state = data.products.reduce<AppCtxState>((acc, cur) => {
          const product: Product = { id: cur.id, name: cur.name };
          const prices: Price[] = cur.prices;
          acc.products.push(product);
          acc.prices[cur.id] = prices;
          return acc;
        }, initialCtxState);

        // console.log("state fromRemote", JSON.stringify(state, null, " "));

        dispatch({ type: "INIT", payload: { state } });

        dispatch({
          type: "SET_INIT_STATUS",
          payload: { status: "INITIALIZED" },
        });
      } catch (_) {}
    }

    async function init() {
      try {
        const state = await getStoredState();
        // console.log("state fromStoredState", JSON.stringify(state, null, " "));
        if (state) {
          dispatch({ type: "INIT", payload: { state } });
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

  const addProduct = useCallback(
    (name: string, price: number) =>
      dispatch({ type: "ADD_PRODUCT", payload: { name, price } }),
    [dispatch]
  );

  const removeProduct = useCallback(
    (id: number) => dispatch({ type: "REMOVE_PRODUCT", payload: { id } }),
    [dispatch]
  );

  const modifyProduct = useCallback(
    (id: number, name: string, price: number) =>
      dispatch({ type: "MODIFY_PRODUCT", payload: { id, name, price } }),
    [dispatch]
  );

  return (
    <AppCtx.Provider
      value={{ state, addProduct, removeProduct, modifyProduct }}
    >
      {children}
    </AppCtx.Provider>
  );
}

export default memo(AppCtxProvider);
