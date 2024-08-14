import { Order } from "../../components/Order";
import ordersStyles from "./index.module.css";

export const Orders = () => {

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
      <Order
        order={{
          timestamp: new Date(),
          items: [{ id: 1, title: "Item Title", price: 199.99, quantity: 10 }],
          total: 202020,
        }}
        formatDate={formatDate}
      />
    </div>
  );
};
