import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  observeAuthState,
  signout,
} from "../../redux/reducerSlices/authSlice";
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
  const { currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(observeAuthState());
  }, []);

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
            <img
              src="https://cdn-icons-png.flaticon.com/128/4290/4290854.png"
              alt="cart"
            />
            Cart
          </li>
        </Link>

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
