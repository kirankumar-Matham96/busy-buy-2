import errorStyles from "./index.module.css";
import errorGif from "../../assets/giphy.gif";

/**
 * `ErrorPage` is a React functional component that displays an error page with a GIF image.
 * 
 * This component is typically used to inform users of an error, such as a 404 Not Found page. It renders a GIF image that visually represents the error state.
 * 
 * - **Styles**:
 *   - Uses `errorStyles` for styling the container div.
 * - **Image**:
 *   - Displays a GIF image sourced from `errorGif` to visually indicate an error.
 * 
 * @returns {React.ReactElement} The JSX element representing the error page with a GIF image.
 */
export const ErrorPage = () => {
  return (
    <div className={errorStyles.bgContainer}>
      <img src={errorGif} alt="404" />
    </div>
  );
};
