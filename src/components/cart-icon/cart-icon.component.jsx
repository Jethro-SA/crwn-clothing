import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles";
import { CartIconContainer, ItemCount } from "./cart-icon.styles";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectCartOpen } from "../../store/cart/cart.selector";
import { setCartOpen } from "../../store/cart/cart.reducer";

const CartIcon = () => {  
  const cartOpen = useSelector(selectCartOpen);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();

  const toggleCartOpen = () => {
    dispatch(setCartOpen(!cartOpen));
  };
  
  return (
    <CartIconContainer onClick={toggleCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
