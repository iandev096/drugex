import * as SecureStore from "expo-secure-store";
import { AppCtxState, Price, Product } from "./type";
import axios from "axios";

const APP_KEY = "drugex";

export async function getStoredState(): Promise<AppCtxState | null> {
  const storedStateSerialized = await SecureStore.getItemAsync(APP_KEY);

  if (storedStateSerialized) {
    const storedState = JSON.parse(storedStateSerialized);
    return storedState;
  }
  return null;
}

export async function setStoredState(state: AppCtxState) {
  await SecureStore.setItemAsync(APP_KEY, JSON.stringify(state));
}

export function fetchProducts() {
  return axios.get("http://www.mocky.io/v2/5c3e15e63500006e003e9795");
}

export function getNextProductId(itemList: Product[], lastProductId: number) {
  if (itemList?.length === 0 || !itemList) {
    return 1;
  }
  return lastProductId + 1;
}

export function getNextPriceId(itemList?: Price[]) {
  if (itemList?.length === 0 || !itemList) {
    return 1;
  }
  return itemList[itemList.length - 1].id + 1;
}

export function getNewPriceList(newPrice: number, prices?: Price[]): Price[] {
  const newPriceObj: Price = {
    id: getNextPriceId(prices),
    date: new Date().toISOString(),
    price: newPrice,
  };

  if (!prices || prices.length === 0) {
    return [newPriceObj];
  }

  // if the newPrice is the same as the latest price, we don't add to the prices.
  if (newPrice === prices[prices.length - 1].price) {
    return [...prices];
  }

  return [...prices, newPriceObj];
}
