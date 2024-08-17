import { useSelector, useDispatch } from "react-redux";
import {
  cartSelector,
  completePurchase,
} from "../../redux/reducerSlices/cartSlice";
import { Button } from "../Button";
import purchaseStyles from "./index.module.css";
import { useEffect } from "react";

/**
 * `PurchaseOption` is a React functional component that displays the total price and a purchase button.
 * 
 * The component uses `useSelector` to access `totalPrice` and `loading` from the Redux store via `cartSelector`. It also uses `useDispatch` to get the `dispatch` function for dispatching actions.
 * 
 * On component mount or when `loading` changes, the `useEffect` hook is set up (currently empty and does not perform any side effects).
 * 
 * The component renders:
 * - The total price of items in the cart.
 * - A `Button` component that dispatches the `completePurchase` action when clicked.
 * 
 * @returns {React.ReactElement} The JSX element containing the total price and the purchase button.
 */
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
