import React, { memo, useCallback, useEffect, useReducer } from "react";
import AppCtx, { initialCtxState } from "./context";
import AppCtxReducer from "./reducer";
import { AppCtxState, Price, Product, ResponseData } from "./type";
import { fetchProducts, getStoredState, setStoredState } from "./util";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

function AppCtxProvider({ children }: Props) {
  const [state, dispatch] = useReducer(AppCtxReducer, initialCtxState);

  useEffect(
    function handleContextChanges() {
      if (state.initializeStatus === "INITIALIZED") {
        setStoredState(state).then();
        // TODO: handle error scenario
        getStoredState().then((state) =>
          console.log("STATE FROM STORE::", JSON.stringify(state, null, 2))
        );
      }
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
          acc.lastProductId += 1;
          return acc;
        }, initialCtxState);

        dispatch({ type: "INIT", payload: { state } });

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
        const state = await getStoredState();

        if (state?.initializeStatus === "INITIALIZED") {
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
