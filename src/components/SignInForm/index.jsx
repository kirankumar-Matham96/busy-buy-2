import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin, authSelector } from "../../redux/reducerSlices/authSlice";
import loginStyles from "./index.module.css";

/**
 * `SignInForm` is a React functional component that provides a sign-in form for users.
 *
 * The component uses local state to manage user input for email and password. It interacts with the Redux store to handle authentication and displays errors if any occur.
 *
 * - **State Management**:
 *   - `email`: Local state for the user's email input.
 *   - `password`: Local state for the user's password input.
 * - **Hooks**:
 *   - `useDispatch`: Provides access to the Redux `dispatch` function for dispatching the `signin` action.
 *   - `useSelector`: Selects `loading`, `error`, and `currentUser` from the Redux store.
 *   - `useNavigate`: Provides navigation capabilities to redirect the user upon successful sign-in.
 * - **Effects**:
 *   - `useEffect`: Redirects the user to the home page if a `currentUser` is present, indicating successful authentication.
 * - **Event Handling**:
 *   - `submitHandle`: Prevents the default form submission and dispatches the `signin` action with the email and password.
 *
 * The component renders:
 * - A form with input fields for email and password.
 * - A submit button styled with `Button` component.
 * - A link to navigate to the sign-up page.
 * - An error message if the `error` state is not empty.
 *
 * @returns {React.ReactElement} The JSX element containing the sign-in form and related UI components.
 */
export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector(authSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(signin({ email, password }));
  };

  return (
    <div className={loginStyles.bgContainer}>
      <h1 className={loginStyles.heading}>Sign In</h1>
      <form onSubmit={submitHandle}>
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
        <Button
          className={loginStyles.btn}
          bgColor={"purple"}
          color={"white"}
          width={"100%"}
          fontSize={"1.3rem"}
          type="submit"
        >
          Sign In
        </Button>
        <Link to="/signup">
          <p className={loginStyles.link}>Or SignUp instead</p>
        </Link>
      </form>
      {error && <p className={loginStyles.error}>Error: {error}</p>}
    </div>
  );
};
