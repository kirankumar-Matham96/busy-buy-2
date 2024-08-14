import { ItemCard } from "../ItemCard";
import itemsContainerStyles from "./index.module.css";

export const ItemsContainer = ({ isCart = false }) => {
  return (
    <div className={itemsContainerStyles.bgContainer}>
      <ItemCard isCart={isCart} />
      <ItemCard isCart={isCart} />
      <ItemCard isCart={isCart} />
      <ItemCard isCart={isCart} />
    </div>
  );
};
