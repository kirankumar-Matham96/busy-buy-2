import { Link } from "react-router-dom";
import { Button } from "../Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, signup } from "../../redux/reducerSlices/authSlice";

import loginStyles from "./index.module.css";

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
    console.log(email, password, confirmPassword);
    const resp = dispatch(signup({ email, password }));
    console.log("signup rep => ", resp);
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
