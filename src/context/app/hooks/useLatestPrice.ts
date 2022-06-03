import { useContext, useMemo } from "react";
import AppCtx from "../context";

export default function useLatestPrice(productId: number) {
  const {
    state: { prices },
  } = useContext(AppCtx);

  const latestPrice = useMemo(() => {
    const productPrices = prices[productId];
    return productPrices[productPrices.length - 1].price;
  }, [productId]);

  return latestPrice;
}
