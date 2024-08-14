import React from "react";
import orderStyles from "./index.module.css";

export const Order = ({ order, formatDate }) => {
  const { timestamp, items, total } = order;
  return (
    <div className={orderStyles.orderContainer}>
      <h2 className={orderStyles.h3}>
        Ordered On:
        {order.timestamp && formatDate(timestamp.seconds)}
      </h2>
      <table className={orderStyles.table}>
        <thead className={orderStyles.tableHead}>
          <tr className={orderStyles.row}>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {/* map through items in the order and display each item */}
          {items.map((item) => (
            <tr className={orderStyles.row} key={item.id}>
              <td className={orderStyles.data}>{item.title}</td>
              <td className={orderStyles.data}>₹ {item.price}</td>
              <td className={orderStyles.data}>{item.quantity}</td>
              <td className={orderStyles.data}>
                ₹ {item.price * item.quantity}
              </td>
            </tr>
          ))}
          <tr className={orderStyles.row}>
            {/* empty cells for spacing */}
            <td className={orderStyles.spcData}></td>
            <td className={orderStyles.spcData}></td>
            <td className={orderStyles.spcData}></td>
            <td className={orderStyles.spcData} colSpan={4}>
              ₹ {total}
            </td>
          </tr>
          {/* extra row for automatic height adjustment */}
          <tr className={orderStyles.autoHeight}></tr>
        </tbody>
      </table>
    </div>
  );
};
