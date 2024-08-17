import { useEffect } from "react";
import { ItemsContainer } from "../../components/ItemsContainer";
import { PurchaseOption } from "../../components/PurchaseOption";
import {
  getInitialCartItems,
  cartSelector,
} from "../../redux/reducerSlices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader";
import empty from "../../assets/empty.gif";
import cartStyles from "./index.module.css";

/**
 * `SignUpForm` is a React functional component that provides a sign-up form for users.
 *
 * This component manages local state for user inputs including email, password, and confirmation password. It handles form submission and user navigation, interacting with the Redux store to handle user sign-up and display any errors that occur.
 *
 * - **State Management**:
 *   - `email`: Local state for the user's email input.
 *   - `password`: Local state for the user's password input.
 *   - `confirmPassword`: Local state for confirming the user's password.
 *   - `signUpAttempt`: Local state to track whether a sign-up attempt has been made.
 * - **Hooks**:
 *   - `useSelector`: Retrieves `loading` and `error` from the Redux store.
 *   - `useDispatch`: Provides access to the Redux `dispatch` function for dispatching the `signup` action.
 *   - `useNavigate`: Provides navigation capabilities to redirect the user upon successful sign-up.
 * - **Effects**:
 *   - `useEffect`: Redirects to the sign-in page if sign-up is successful and no errors are present. Logs errors to the console if they occur.
 * - **Event Handling**:
 *   - `submitHandle`: Handles form submission, dispatches the `signup` action with email, password, and confirmation password, and updates the sign-up attempt state.
 *
 * The component renders:
 * - A form with input fields for name, email, password, and password confirmation.
 * - A submit button styled with the `Button` component.
 * - A link to navigate to the sign-in page for users who already have an account.
 *
 * @returns {React.ReactElement} The JSX element containing the sign-up form and related UI components.
 */
export const Cart = () => {
  const { cart, loading } = useSelector(cartSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialCartItems());
  }, [dispatch]);

  return (
    <div className={cartStyles.bgContainer}>
      <div className={cartStyles.purchaseOptionContainer}>
        <PurchaseOption />
      </div>
      {loading ? <Loader /> : null}
      {cart.length > 0 ? (
        <ItemsContainer isCart={true} items={cart} />
      ) : (
        <div className={cartStyles.emptyMessage}>
          <h1>Add Some Items...</h1>
          <img src={empty} alt="empty" />
        </div>
      )}
    </div>
  );
};
