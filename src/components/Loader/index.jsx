import React from "react";
import { MutatingDots } from "react-loader-spinner";
import loaderStyles from "./index.module.css";

/**
 * `Loader` is a React functional component that displays a loading spinner.
 * 
 * This component renders a `MutatingDots` spinner from the `react-loader-spinner` library to indicate loading or processing activities.
 * 
 * The spinner is styled using CSS modules and is configured to be visible with specific size, color, and animation properties.
 * 
 * @returns {JSX.Element} The rendered loading spinner wrapped in a container with specific styles.
 */
export const Loader = () => {
  return (
    <div className={loaderStyles.container}>
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="orangered"
        radius="14.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
