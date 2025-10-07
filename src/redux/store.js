import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/ProductSlice";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    if (data) {
      const parsed = JSON.parse(data);
      // ensure structure
      return { product: Array.isArray(parsed.product) ? parsed.product : [] };
    }
    return { product: [] };
  } catch {
    return { product: [] };
  }
};

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state.cartList));
  } catch {}
};

const preloadedState = {
  cartList: loadFromLocalStorage()
};

const store = configureStore({
  reducer: { cartList: cartReducer },
  preloadedState
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
