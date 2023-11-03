import { createSlice } from "@reduxjs/toolkit";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((item) => item.id == productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id == productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : { ...cartItem }
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToDecrease) => {
  const existingCartItem = cartItems.find(
    (item) => item.id == productToDecrease.id
  );

  if (existingCartItem && existingCartItem.quantity > 1) {
    return cartItems.map((cartItem) =>
      cartItem.id == productToDecrease.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : { ...cartItem }
    );
  }

  return clearCartItem(cartItems, productToDecrease);
};

const clearCartItem = (cartItems, productToClear) => {
  const existingCartItem = cartItems.find(
    (item) => item.id == productToClear.id
  );

  if (existingCartItem) {
    return cartItems.filter((item) => item.id != existingCartItem.id);
  }

  return cartItems;
};

const INITIAL_STATE = {
  cartOpen: false,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    setCartOpen(state, action) {
      state.cartOpen = action.payload;
    },

    addItemToCart(state, action) {      
      state.cartItems = addCartItem(state.cartItems, action.payload);            
    },

    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },

    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
  },
});

export const {
  setCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
