import { Link, Outlet } from "react-router-dom";
import "./navigation.styles.scss";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {

  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo"/>
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {
            currentUser ? (
              <Link className="nav-link" onClick={signOutUser} to="/">
                SIGN OUT
              </Link>
            ) :
            (
              <Link className="nav-link" to="/auth">
                SIGN IN
              </Link>
            )
          }

          
        </div>
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
