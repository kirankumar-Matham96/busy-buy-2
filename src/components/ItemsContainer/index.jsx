import { ItemCard } from "../ItemCard";
import itemsContainerStyles from "./index.module.css";

export const ItemsContainer = () => {
  return (
    <div className={itemsContainerStyles.bgContainer}>
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </div>
  );
};
