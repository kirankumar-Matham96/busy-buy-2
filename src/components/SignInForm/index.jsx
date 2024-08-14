import { Link } from "react-router-dom";
import { Button } from "../Button";
import loginStyles from "./index.module.css";

export const SignInForm = () => {
  return (
    <div className={loginStyles.bgContainer}>
      <h1 className={loginStyles.heading}>Sign In</h1>
      <input className={loginStyles.input} type="email" placeholder="Email" />
      <input
        className={loginStyles.input}
        type="password"
        placeholder="Password"
      />
      <Button
        className={loginStyles.btn}
        bgColor={"purple"}
        color={"white"}
        width={"100%"}
        fontSize={"1.3rem"}
      >
        Sign In
      </Button>
      <Link to="/signup">
        <p className={loginStyles.link}>Or SignUp instead</p>
      </Link>
    </div>
  );
};
