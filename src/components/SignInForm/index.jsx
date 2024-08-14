import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin, authSelector } from "../../redux/reducerSlices/authSlice";
import loginStyles from "./index.module.css";

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
    console.log(email, password);
    dispatch(signin({ email, password }));
  };

  return (
    <div className={loginStyles.bgContainer}>
      {/* {console.log(loading, error, currentUser.email)} */}
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
