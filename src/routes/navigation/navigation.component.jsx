import { Outlet } from "react-router-dom";
import {
  LogoContainer,
  NavLink,
  NavLinks,
  NavigationContainer,
} from "./navigation.styles";
import { Fragment} from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { useSelector } from 'react-redux';
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);  
  const cartOpen = useSelector(selectCartOpen);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>
          {currentUser ? (
            <NavLink onClick={signOutUser} to="/">
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
      </NavigationContainer>

      {cartOpen && <CartDropdown />}

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
