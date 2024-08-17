import { Link } from "react-router-dom";
import { Button } from "../Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, signup } from "../../redux/reducerSlices/authSlice";
import loginStyles from "./index.module.css";

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
export const SignUpForm = () => {
  const { loading, error } = useSelector(authSelector);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpAttempt, setSignUpAttempt] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    !loading && signUpAttempt && !error && navigate("/signin");
    error && console.log("error signup => ", error);
  }, [loading, signUpAttempt, error, navigate]);

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(signup({ email, password }));
    setSignUpAttempt(true);
  };

  return (
    <div className={loginStyles.bgContainer}>
      <h1 className={loginStyles.heading}>Sign Up</h1>
      <form onSubmit={submitHandle}>
        <input className={loginStyles.input} type="text" placeholder="Name" />
        <input
          className={loginStyles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={loginStyles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={loginStyles.input}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          className={loginStyles.btn}
          bgColor={"purple"}
          color={"white"}
          width={"100%"}
          fontSize={"1.3rem"}
          type="submit"
        >
          Sign Up
        </Button>
      </form>
      <Link to="/signin">
        <p className={loginStyles.link}>Have an account already?</p>
      </Link>
    </div>
  );
};
