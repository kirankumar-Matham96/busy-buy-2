import { Button } from "../Button";
import cardStyles from "./index.module.css";

export const ItemCard = ({ isCart, item }) => {
  console.log("item => ", item);
  const { title, price, image, id, quantity } = item;
  return (
    <div className={cardStyles.cardContainer}>
      <img
        className={cardStyles.image}
        // src="https://imgs.search.brave.com/0mktqo9UA-JoMx1d9DhlGIwereT71o1CnPwQhPCM8Ts/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFjTnF3ejVscEwu/anBn"
        src={image}
        alt={title}
      />
      <p className={cardStyles.description}>{title}</p>
      <div className={cardStyles.priceContainer}>
        <p className={cardStyles.price}>&#8377; {price}</p>
        {isCart ? (
          <div className={cardStyles.buttonsContainer}>
            <Button padding={"0"}>
              <img
                className={cardStyles.btnImage}
                src="https://cdn-icons-png.flaticon.com/128/1828/1828899.png"
                alt="decrease"
              />
            </Button>
            <p>{quantity}</p>
            <Button>
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
        <Button bgColor="purple" color="white">
          Add To Cart
        </Button>
      ) : (
        <Button bgColor="red" color="white">
          Remove from Cart
        </Button>
      )}
    </div>
  );
};
