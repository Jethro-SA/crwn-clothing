import { createSelector } from "reselect";

const selectCartReducer = state => state.cart;

export const selectCartItems = createSelector([selectCartReducer], cart => cart.cartItems);

export const selectCartOpen = createSelector([selectCartReducer], cart => cart.cartOpen);

export const selectCartCount = createSelector([selectCartItems], cartItems => {
    const newCartCount = countItems(cartItems);

    return newCartCount;
});

export const selectCartTotal = createSelector([selectCartItems], cartItems => {
    const newCartTotal = sumItemTotals(cartItems);

    return newCartTotal;
});

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


