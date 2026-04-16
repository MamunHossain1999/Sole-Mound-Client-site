import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId
      );

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (i) => i.productId !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;