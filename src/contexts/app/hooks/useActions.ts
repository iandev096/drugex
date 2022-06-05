import { useContext } from "react";
import AppCtx from "../context";

export default function useActions() {
  const { state: _, ...actions } = useContext(AppCtx);

  return actions;
}
