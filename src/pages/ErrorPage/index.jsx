import errorStyles from "./index.module.css";
import errorGif from "../../assets/giphy.gif";

export const ErrorPage = () => {
  return (
    <div className={errorStyles.bgContainer}>
      <img src={errorGif} alt="404" />
    </div>
  );
};
