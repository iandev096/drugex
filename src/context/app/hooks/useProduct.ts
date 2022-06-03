import { useContext, useMemo } from "react";
import AppCtx from "../context";

export default function useProduct(productId: number) {
  const {
    state: { products },
  } = useContext(AppCtx);

  const product = useMemo(
    () => products.find((product) => product.id === productId),
    [productId]
  );

  return product;
}
