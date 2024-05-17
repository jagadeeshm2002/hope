import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: localStorage.getItem("cartTotalQuantity")
    ? JSON.parse(localStorage.getItem("cartTotalQuantity"))
    : 0,
  cartTotalAmount: localStorage.getItem("cartTotalAmount")
    ? JSON.parse(localStorage.getItem("cartTotalAmount"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += +action.payload.quantity || 1;
      } else {
        const tempProduct = { ...action.payload, quantity: +action.payload.quantity || 1 };
        state.cartItems.push(tempProduct);
      }

      state.cartTotalQuantity += +action.payload.quantity || 1;
      state.cartTotalAmount += +action.payload.offerPrice * +action.payload.quantity || 1;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem(
        "cartTotalQuantity",
        JSON.stringify(state.cartTotalQuantity)
      );
      localStorage.setItem(
        "cartTotalAmount",
        JSON.stringify(state.cartTotalAmount)
      );
    },
    removeFromCart: (state, action) => {
      const nextCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        state.cartTotalQuantity -= item.quantity;
        state.cartTotalAmount -= item.price * item.quantity;
      }

      state.cartItems = nextCartItems;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem(
        "cartTotalQuantity",
        JSON.stringify(state.cartTotalQuantity)
      );
      localStorage.setItem(
        "cartTotalAmount",
        JSON.stringify(state.cartTotalAmount)
      );
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
        state.cartTotalQuantity -= 1;
        state.cartTotalAmount -= state.cartItems[itemIndex].offerPrice;
      } else if (state.cartItems[itemIndex].quantity === 1) {
        state.cartTotalQuantity -= 1;
        state.cartTotalAmount -= state.cartItems[itemIndex].offerPrice;
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem(
        "cartTotalQuantity",
        JSON.stringify(state.cartTotalQuantity)
      );
      localStorage.setItem(
        "cartTotalAmount",
        JSON.stringify(state.cartTotalAmount)
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;

      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartTotalQuantity");
      localStorage.removeItem("cartTotalAmount");
    },
    getTotals: (state) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;

      localStorage.setItem(
        "cartTotalQuantity",
        JSON.stringify(state.cartTotalQuantity)
      );
      localStorage.setItem(
        "cartTotalAmount",
        JSON.stringify(state.cartTotalAmount)
      );
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;


export const selectCart = (state) => state.cart;
export const selectCartQuantity = (state) => state.cart.cartTotalQuantity;
