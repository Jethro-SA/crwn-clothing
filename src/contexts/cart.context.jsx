import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

export const CART_ACTION_TYPES = {
  SET_CART_OPEN: "SET_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const INITIAL_STATE = {
  cartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_OPEN:
      return {
        ...state,
        cartOpen: payload,
      };

    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
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

const countItems = (cartItems) => {
  const count = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  return count;
};

const sumItemTotals = (cartItems) => {
  const total = cartItems.reduce(
    (total, { quantity, price }) => total + quantity * price,
    0
  );

  return total;
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartOpen, cartItems, cartCount, cartTotal } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = countItems(newCartItems);
    const newCartTotal = sumItemTotals(newCartItems);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const setCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);

    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToDecrease) => {
    const newCartItems = removeCartItem(cartItems, productToDecrease);

    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);

    updateCartItemsReducer(newCartItems);
  };

  const value = {
    cartOpen,
    setCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
