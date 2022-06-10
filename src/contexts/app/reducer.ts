import AppCtxAction from "./action";
import { AppCtxState } from "./type";
import { getNewPriceList, getNextProductId } from "./util";

export default function AppCtxReducer(
  state: AppCtxState,
  action: AppCtxAction
): AppCtxState {
  switch (action.type) {
    case "ADD_PRODUCT":
      const newProductId = getNextProductId(
        state.products,
        state.lastProductId
      );
      const prices = state.prices[newProductId];
      const nextLastProductId = state.lastProductId + 1;

      return {
        ...state,
        products: [
          { id: newProductId, name: action.payload.name },
          ...state.products,
        ],
        prices: {
          ...state.prices,
          [newProductId]: getNewPriceList(action.payload.price, prices),
        },
        lastProductId: nextLastProductId,
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
      let removedProduct = [...state.removed];
      const productsAfterRemove = state.products.filter((product) => {
        if (product.id !== action.payload.id) {
          return true;
        } else {
          removedProduct.push(product);
        }
      });

      return {
        ...state,
        products: productsAfterRemove,
        removed: removedProduct,
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
