import { Button } from "../Button";
import { useDispatch } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  reduceQuantity,
  removeFromCart,
} from "../../redux/reducerSlices/cartSlice";
import cardStyles from "./index.module.css";

/**
 * `ItemCard` is a component that displays details of an item and provides actions to manage the item in the cart.
 * 
 * This component displays the item's image, title, and price. It conditionally renders buttons based on whether the item is in the cart (`isCart` prop):
 * - If the item is in the cart:
 *   - Quantity adjustment buttons (increase and decrease).
 *   - A button to remove the item from the cart.
 * - If the item is not in the cart:
 *   - A button to add the item to the cart.
 * 
 * The component uses Redux to dispatch actions for managing cart operations. It employs the `useDispatch` hook from `react-redux` to dispatch actions when buttons are clicked.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.isCart - Indicates if the item is currently in the cart. Determines which buttons to render.
 * @param {Object} props.item - The item details to display.
 * @param {string} props.item.title - The title of the item.
 * @param {number} props.item.price - The price of the item.
 * @param {string} props.item.image - The URL of the item's image.
 * @param {string} props.item.id - The unique identifier of the item.
 * @param {number} [props.item.quantity] - The quantity of the item in the cart. Only applicable if `isCart` is true.
 * 
 * @returns {JSX.Element} The rendered item card component with appropriate buttons and item details.
 */
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
