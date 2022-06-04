import { useContext } from "react";
import AppCtx from "../../context";

export default function useProducts() {
  const {
    state: { products },
  } = useContext(AppCtx);

  return products;
}
