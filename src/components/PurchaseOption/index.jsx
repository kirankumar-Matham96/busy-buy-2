import { Button } from "../Button";
import purchaseStyles from "./index.module.css";

export const PurchaseOption = () => {
  return (
    <div className={purchaseStyles.bgContainer}>
      <h3>Total Price: 1300/-</h3>
      <Button bgColor={"purple"} color={"white"} fontSize={"1.2rem"}>
        Purchase
      </Button>
    </div>
  );
};
