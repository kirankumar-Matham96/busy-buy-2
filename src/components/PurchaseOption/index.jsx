import { useSelector, useDispatch } from "react-redux";
import {
  cartSelector,
  completePurchase,
} from "../../redux/reducerSlices/cartSlice";
import { Button } from "../Button";
import purchaseStyles from "./index.module.css";
import { useEffect } from "react";

export const PurchaseOption = () => {
  const { totalPrice, loading } = useSelector(cartSelector);
  const dispatch = useDispatch();

  useEffect(() => {}, [loading]);

  return (
    <div className={purchaseStyles.bgContainer}>
      <h3>Total Price: {totalPrice}/-</h3>
      <Button
        bgColor={"purple"}
        color={"white"}
        fontSize={"1.2rem"}
        onClick={() => dispatch(completePurchase())}
      >
        Purchase
      </Button>
    </div>
  );
};
