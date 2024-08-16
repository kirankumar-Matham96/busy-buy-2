import { useEffect } from "react";
import { ItemsContainer } from "../../components/ItemsContainer";
import { PurchaseOption } from "../../components/PurchaseOption";
import {
  getInitialCartItems,
  cartSelector,
} from "../../redux/reducerSlices/cartSlice";
import cartStyles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader";

export const Cart = () => {
  const { cart, loading } = useSelector(cartSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialCartItems());
  }, [dispatch]);

  return (
    <div className={cartStyles.bgContainer}>
      <div className={cartStyles.purchaseOptionContainer}>
        <PurchaseOption />
      </div>
      {loading ? <Loader /> : <ItemsContainer isCart={true} items={cart} />}
    </div>
  );
};
