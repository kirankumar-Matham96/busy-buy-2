import { Link } from "react-router-dom";
import { Button } from "../Button";
import loginStyles from "./index.module.css";

export const SignUpForm = () => {
  return (
    <div className={loginStyles.bgContainer}>
      <h1 className={loginStyles.heading}>Sign Up</h1>
      <input className={loginStyles.input} type="text" placeholder="Name" />
      <input className={loginStyles.input} type="email" placeholder="Email" />
      <input
        className={loginStyles.input}
        type="password"
        placeholder="Password"
      />
      <input
        className={loginStyles.input}
        type="password"
        placeholder="Confirm Password"
      />
      <Button
        className={loginStyles.btn}
        bgColor={"purple"}
        color={"white"}
        width={"100%"}
        fontSize={"1.3rem"}
      >
        Sign Up
      </Button>
      <Link to="/signin">
        <p className={loginStyles.link}>Have an account already?</p>
      </Link>
    </div>
  );
};
