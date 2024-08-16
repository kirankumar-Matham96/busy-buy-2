import { useSelector } from "react-redux";
import { cartSelector } from "../../redux/reducerSlices/cartSlice";
import { Button } from "../Button";
import purchaseStyles from "./index.module.css";
import { useEffect } from "react";

export const PurchaseOption = () => {
  const { totalPrice, loading } = useSelector(cartSelector);
  console.log("totalPrice => ", totalPrice);

  useEffect(() => {}, [loading]);

  return (
    <div className={purchaseStyles.bgContainer}>
      <h3>Total Price: {totalPrice}/-</h3>
      <Button bgColor={"purple"} color={"white"} fontSize={"1.2rem"}>
        Purchase
      </Button>
    </div>
  );
};
