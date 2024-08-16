import React from "react";
import { MutatingDots } from "react-loader-spinner";
import loaderStyles from "./index.module.css";

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
