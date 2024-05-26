import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  products: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
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
      const itemIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      
      if (itemIndex >= 0) {
        state.products[itemIndex].quantity += 1;
      } else {
        const tempProduct = {
          ...action.payload,
          quantity: 1 ,
        };
        state.products.push(tempProduct);
      }

      state.cartTotalQuantity += 1;
      state.cartTotalAmount +=
        +action.payload.offerPrice * 1;

      localStorage.setItem("products", JSON.stringify(state.products));
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
      const nextproducts = state.products.filter(
        (item) => item.id !== action.payload.id
      );

      const item = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        state.cartTotalQuantity -= item.quantity;
        state.cartTotalAmount -= item.price * item.quantity;
      }

      state.products = nextproducts;

      localStorage.setItem("products", JSON.stringify(state.products));
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
      const itemIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity -= 1;
        state.cartTotalQuantity -= 1;
        state.cartTotalAmount -= state.products[itemIndex].offerPrice;
      } else if (state.products[itemIndex].quantity === 1) {
        state.cartTotalQuantity -= 1;
        state.cartTotalAmount -= state.products[itemIndex].offerPrice;
        state.products = state.products.filter(
          (item) => item.id !== action.payload.id
        );
      }

      localStorage.setItem("products", JSON.stringify(state.products));
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
      state.products = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      

      localStorage.removeItem("products");
      localStorage.removeItem("cartTotalQuantity");
      localStorage.removeItem("cartTotalAmount");
    },
    getTotals: (state) => {
      let { total, quantity } = state.products.reduce(
        (cartTotal, product) => {
          const { price, quantity } = product;
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
