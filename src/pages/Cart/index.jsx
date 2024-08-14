import { ItemsContainer } from "../../components/ItemsContainer";
import { PurchaseOption } from "../../components/PurchaseOption";
import cartStyles from "./index.module.css";

export const Cart = () => {
  return (
    <div className={cartStyles.bgContainer}>
      <div className={cartStyles.purchaseOptionContainer}>
        <PurchaseOption />
      </div>
      <ItemsContainer isCart={true} />
    </div>
  );
};
