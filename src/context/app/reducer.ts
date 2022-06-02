import AppCtxAction from "./action";
import { AppCtxState } from "./type";
import { getNewPriceList, getNextId } from "./util";

export default function AppCtxReducer(
  state: AppCtxState,
  action: AppCtxAction
): AppCtxState {
  switch (action.type) {
    case "ADD_PRODUCT":
      const newProductId = getNextId(state.products);
      const prices = state.prices[newProductId];

      return {
        ...state,
        products: [
          ...state.products,
          { id: newProductId, name: action.payload.name },
        ],
        prices: {
          ...state.prices,
          [newProductId]: getNewPriceList(action.payload.price, prices),
        },
      };

    case "MODIFY_PRODUCT":
      const modifiedPrices = state.prices[action.payload.id];

      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload.id) {
            product.name = action.payload.name;
          }
          return product;
        }),
        prices: {
          ...state.prices,
          [action.payload.id]: getNewPriceList(
            action.payload.price,
            modifiedPrices
          ),
        },
      };

    case "REMOVE_PRODUCT":
      const productsAfterRemove = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      const pricesAfterRemove = { ...state.prices };
      delete pricesAfterRemove[action.payload.id];

      return {
        ...state,
        products: productsAfterRemove,
        prices: pricesAfterRemove,
      };

    case "INIT":
      return action.payload.state;

    case "SET_INIT_STATUS":
      return {
        ...state,
        initializeStatus: action.payload.status,
      };

    default:
      return state;
  }
}
