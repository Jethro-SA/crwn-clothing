import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setCartOpen = (bool) => {
    return createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool);
};

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

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToDecrease) => {
  const newCartItems = removeCartItem(cartItems, productToDecrease);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};