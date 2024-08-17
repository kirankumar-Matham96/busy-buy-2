import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  observeAuthState,
  signout,
} from "../../redux/reducerSlices/authSlice";
import {
  cartSelector,
  getInitialCartItems,
} from "../../redux/reducerSlices/cartSlice";
import navStyles from "./index.module.css";
import { useEffect } from "react";

/**
 * `NavBar` is a React functional component that renders a navigation bar.
 *
 * The navigation bar displays links to various sections of the application (Home, My Orders, Cart) and provides a sign-in/sign-out option based on the authentication state of the user.
 *
 * The component uses Redux to access authentication state and dispatch actions for signing out. It also uses a `useEffect` hook to observe changes in the authentication state.
 *
 * @returns {JSX.Element} The rendered navigation bar with dynamic links and sign-in/sign-out options.
 */
export const NavBar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector);
  const { cart, loading } = useSelector(cartSelector);

  /**
   * Effect to observe the user login status.
   */
  useEffect(() => {
    dispatch(observeAuthState());
  }, [dispatch]);

  /**
   * Effect to fetch the cart items count when a user chanhes.
   */
  useEffect(() => {
    currentUser && dispatch(getInitialCartItems());
  }, [dispatch, currentUser]);

  const signOutHandle = () => {
    dispatch(signout());
  };

  return (
    <div className={navStyles.navContainer}>
      <div className={navStyles.navBrand}>
        <p>Busy Buy</p>
      </div>
      <ul className={navStyles.navLinks}>
        <Link to="/">
          <li className={navStyles.navLink}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/609/609803.png"
              alt="home"
            />
            Home
          </li>
        </Link>
        {currentUser ? (
          <>
            <Link to="/orders">
              <li className={navStyles.navLink}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2048/2048947.png"
                  alt="orders"
                />
                My Orders
              </li>
            </Link>
            <Link to="/cart">
              <li className={navStyles.navLink}>
                <span className={navStyles.cartCount}>
                  {!loading ? cart.length : 0}
                </span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/4290/4290854.png"
                  alt="cart"
                />
                Cart
              </li>
            </Link>
          </>
        ) : null}

        {currentUser ? (
          <li className={navStyles.navLink} onClick={signOutHandle}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/14722/14722724.png"
              alt="sign in"
            />
            Sign Out
          </li>
        ) : (
          <Link to="/signIn">
            <li className={navStyles.navLink}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/9653/9653944.png"
                alt="sign in"
              />
              Sign In
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
};
