import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authSelector } from "../../redux/reducerSlices/authSlice";

export const ProtectedRoutes = (props) => {
  const { currentUser } = useSelector(authSelector);
  return currentUser ? <>{props.children}</> : <Navigate to="/signin" />;
};
