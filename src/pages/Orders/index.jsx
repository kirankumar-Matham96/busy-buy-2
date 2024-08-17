import { useEffect } from "react";
import { Order } from "../../components/Order";
import { useDispatch, useSelector } from "react-redux";
import {
  getInitialOrders,
  ordersSelector,
} from "../../redux/reducerSlices/ordersSlice";
import { Loader } from "../../components/Loader";
import ordersStyles from "./index.module.css";

/**
 * `Orders` is a React functional component that displays a list of user orders.
 *
 * This component retrieves the user's orders from the Redux store and displays them. It also handles loading states and error scenarios.
 *
 * - **UI Elements**:
 *   - `Order`: Component for displaying individual orders.
 *   - `Loader`: Component shown while orders are being fetched.
 * - **Styles**:
 *   - Uses `ordersStyles` for styling the order container and heading.
 * - **Redux Integration**:
 *   - Uses `useDispatch` to dispatch actions.
 *   - Uses `useSelector` to access the `orders`, `loading`, and `error` state from the Redux store.
 *   - Dispatches `getInitialOrders` to fetch the list of orders.
 * - **Date Formatting**:
 *   - Contains a helper function `formatDate` to format the order timestamp into a `YYYY-MM-DD` format.
 *
 * @returns {React.ReactElement} The JSX element representing the orders page layout, including a loading spinner or the list of orders based on the loading state.
 */
export const Orders = () => {
  const dispatch = useDispatch();
  const { loading, orders } = useSelector(ordersSelector);

  useEffect(() => {
    dispatch(getInitialOrders());
  }, [dispatch]);

  /**
   * Formats a given timestamp into a `YYYY-MM-DD` string.
   *
   * This function converts a timestamp into a human-readable date format. It handles two types of timestamp inputs:
   *
   * - **Seconds-based Timestamp**: If the timestamp has a `seconds` property, it is assumed to be in seconds since the Unix epoch. It is converted to milliseconds before creating a `Date` object.
   * - **Date String**: If the timestamp is a string, it is directly used to create a `Date` object.
   *
   * The resulting date string is always in the format `YYYY-MM-DD`, with leading zeros added for single-digit months and days.
   *
   * @param {Object|string} timestamp - The timestamp to format. Can be an object with a `seconds` property or a date string.
   * @param {number} [timestamp.seconds] - A timestamp in seconds since the Unix epoch. Only used if the timestamp is an object.
   * @returns {string} The formatted date string in `YYYY-MM-DD` format.
   */
  const formatDate = (timestamp) => {
    let date = null;
    if (timestamp.seconds) {
      // convert seconds to milliseconds and create a Date object
      date = new Date(timestamp.seconds * 1000);
    } else {
      // create a Date object from date string
      date = new Date(timestamp);
    }
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
      {loading ? (
        <Loader />
      ) : (
        orders &&
        orders.map((order) => <Order order={order} formatDate={formatDate} />)
      )}
    </div>
  );
};
