import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authSelector } from "../../redux/reducerSlices/authSlice";

/**
 * `ProtectedRoutes` is a React functional component that conditionally renders its children based on user authentication.
 * 
 * The component uses the `authSelector` to check if a `currentUser` is present in the Redux store. If a `currentUser` is found, the component renders its child elements. If no `currentUser` is found, the component redirects the user to the "/signin" route.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child elements to be rendered if the user is authenticated.
 * 
 * @returns {React.ReactElement} Either the child elements or a redirection to the "/signin" route based on the user's authentication status.
 */
export const ProtectedRoutes = (props) => {
  const { currentUser } = useSelector(authSelector);
  return currentUser ? <>{props.children}</> : <Navigate to="/signin" />;
};
