import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: []
};

export const ProductSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      // ensure state.product is array
      if (!Array.isArray(state.product)) state.product = [];

      const existingItem = state.product.find(
        item => item.id === action.payload.id && item.color_name === action.payload.color_name
      );

      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      } else {
        state.product.push(action.payload);
      }
    },
    removeFromcart: (state, action) => {
      if (!Array.isArray(state.product)) return;
      state.product = state.product.filter(item => item.id !== action.payload);
    },
    setCart: (state, action) => {
      state.product = Array.isArray(action.payload) ? action.payload : [];
    },
    clearCart: (state) => {
      state.product = [];
    }

  }
});

export const { addtoCart, removeFromcart, setCart, clearCart } = ProductSlice.actions;
export default ProductSlice.reducer;
