import { Button } from "../Button";
import { useDispatch } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  reduceQuantity,
  removeFromCart,
} from "../../redux/reducerSlices/cartSlice";
import cardStyles from "./index.module.css";

export const ItemCard = ({ isCart, item }) => {
  const { title, price, image, id, quantity } = item;

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(item));
  };

  const removeFromCartHandle = () => {
    dispatch(removeFromCart(id));
  };

  const increaseQuantityHandle = () => {
    dispatch(increaseQuantity(id));
  };

  const decreaseQuantityHandle = () => {
    dispatch(reduceQuantity(id));
  };

  return (
    <div className={cardStyles.cardContainer}>
      <img className={cardStyles.image} src={image} alt={title} />
      <p className={cardStyles.description}>{title}</p>
      <div className={cardStyles.priceContainer}>
        <p className={cardStyles.price}>&#8377; {price}</p>
        {isCart ? (
          <div className={cardStyles.buttonsContainer}>
            <Button padding={"0"} onClick={decreaseQuantityHandle}>
              <img
                className={cardStyles.btnImage}
                src="https://cdn-icons-png.flaticon.com/128/1828/1828899.png"
                alt="decrease"
              />
            </Button>
            <p>{quantity}</p>
            <Button padding={"0"} onClick={increaseQuantityHandle}>
              <img
                className={cardStyles.btnImage}
                src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png"
                alt="increase"
              />
            </Button>
          </div>
        ) : null}
      </div>
      {!isCart ? (
        <Button bgColor="purple" color="white" onClick={addToCartHandler}>
          Add To Cart
        </Button>
      ) : (
        <Button bgColor="red" color="white" onClick={removeFromCartHandle}>
          Remove from Cart
        </Button>
      )}
    </div>
  );
};
