import { ItemCard } from "../ItemCard";
import itemsContainerStyles from "./index.module.css";

export const ItemsContainer = ({ isCart = false, items }) => {
  console.log("items => ", items);
  return (
    <div className={itemsContainerStyles.bgContainer}>
      {items &&
        items.map((item) => (
          <ItemCard isCart={isCart} key={item.id} item={item} />
        ))}
    </div>
  );
};
