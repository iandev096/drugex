import { useContext } from "react";
import AppCtx from "../../context";

export default function usePrices() {
  const {
    state: { prices },
  } = useContext(AppCtx);

  return prices;
}
