import React, { memo, useCallback, useEffect, useReducer } from "react";
import AppCtx, { initialCtxState } from "./context";
import useAppCtxInit from "./hooks/useAppCtxInit";
import AppCtxReducer from "./reducer";
import { setStoredState } from "./util";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

function AppCtxProvider({ children }: Props) {
  const [state, dispatch] = useReducer(AppCtxReducer, initialCtxState);

  useAppCtxInit(state, dispatch);

  useEffect(
    function handleContextChanges() {
      if (state.initializeStatus === "INITIALIZED") {
        setStoredState(state).then();
        // TODO: handle error scenario
      }
    },
    [state]
  );

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
