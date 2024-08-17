import { ItemCard } from "../ItemCard";
import itemsContainerStyles from "./index.module.css";

/**
 * `ItemsContainer` is a React functional component that displays a list of item cards.
 * 
 * This component takes a list of items and renders an `ItemCard` for each item. It can conditionally render the item cards as part of a cart or as regular items based on the `isCart` prop.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} [props.isCart=false] - Indicates whether the items are being displayed in a cart view. Determines the behavior and appearance of the item cards.
 * @param {Array<Object>} props.items - An array of item objects to be displayed. Each item object should contain details required by the `ItemCard` component.
 * @param {string} props.items[].id - The unique identifier of the item.
 * @param {string} props.items[].title - The title of the item.
 * @param {number} props.items[].price - The price of the item.
 * @param {string} props.items[].image - The URL of the item's image.
 * @param {number} [props.items[].quantity] - The quantity of the item in the cart. Only applicable if `isCart` is true.
 * 
 * @returns {JSX.Element} The rendered container with item cards based on the provided items.
 */
export const ItemsContainer = ({ isCart = false, items }) => {
  return (
    <div className={itemsContainerStyles.bgContainer}>
      {items &&
        items.map((item) => (
          <ItemCard isCart={isCart} key={item.id} item={item} />
        ))}
    </div>
  );
};
