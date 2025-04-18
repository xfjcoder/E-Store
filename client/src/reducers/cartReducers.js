// client/src/reducers/cartReducers.js
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
  CART_CLEAR_ITEMS,
  CART_FETCH_REQUEST,
  CART_FETCH_SUCCESS,
  CART_FETCH_FAIL,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_UPDATE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case CART_FETCH_REQUEST:
      return { ...state, loading: true };
    case CART_FETCH_SUCCESS:
      return { ...state, loading: false, cartItems: action.payload };
    case CART_FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
