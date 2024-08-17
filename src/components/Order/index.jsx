import React from "react";
import orderStyles from "./index.module.css";

/**
 * `Order` is a React functional component that displays details of an order.
 * 
 * The component takes in an `order` object and a `formatDate` function as props. It renders the order's timestamp, a table with item details (including title, price, quantity, and total price for each item), and the overall total of the order.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.order - The order object containing details of the order.
 * @param {number} props.order.timestamp - The timestamp when the order was placed.
 * @param {Array<Object>} props.order.items - An array of items in the order.
 * @param {number} props.order.total - The total price of the order.
 * @param {Function} props.formatDate - A function to format the timestamp into a readable date string.
 * 
 * @returns {JSX.Element} The rendered order details including a table of items and the total price.
 */
export const Order = ({ order, formatDate }) => {
  const { timestamp, items, total } = order;
  return (
    <div className={orderStyles.orderContainer}>
      <h2 className={orderStyles.h3}>
        Ordered On:&nbsp;
        {console.log({timestamp})}
        {timestamp && formatDate(timestamp)}
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
