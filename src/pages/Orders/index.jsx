import { useEffect } from "react";
import { Order } from "../../components/Order";
import { useDispatch, useSelector } from "react-redux";
import {
  getInitialOrders,
  ordersSelector,
} from "../../redux/reducerSlices/ordersSlice";
import ordersStyles from "./index.module.css";

export const Orders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector(ordersSelector);

  console.log("orders => ", orders);

  useEffect(() => {
    dispatch(getInitialOrders());
  }, []);

  const formatDate = (seconds) => {
    // convert seconds to milliseconds and create a Date object
    const date = new Date(seconds * 1000);
    // add leading zero for single-digit days and months
    return `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  };

  return (
    <div className={ordersStyles.container}>
      <h1 className={ordersStyles.h1}>Your Orders</h1>
      {loading ? "Loading..." : null}
      {orders &&
        orders.map((order) => <Order order={order} formatDate={formatDate} />)}
    </div>
  );
};
