import { createContext, useEffect, useState } from "react";

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
  const existingCartItem = cartItems.find((item) => item.id == productToClear.id);

  if (existingCartItem) {
    return cartItems.filter(item => item.id != existingCartItem.id);
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
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartCount(countItems(cartItems));    
  }, [cartItems]);

  useEffect(() => {    
    setCartTotal(sumItemTotals(cartItems));
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToDecrease) => {
    setCartItems(removeCartItem(cartItems, productToDecrease));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
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
