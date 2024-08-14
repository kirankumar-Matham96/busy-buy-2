import { Button } from "../Button";
import cardStyles from "./index.module.css";

export const ItemCard = () => {
  return (
    <div className={cardStyles.cardContainer}>
      <img className={cardStyles.image}
        src="https://imgs.search.brave.com/0mktqo9UA-JoMx1d9DhlGIwereT71o1CnPwQhPCM8Ts/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFjTnF3ejVscEwu/anBn"
        alt="item"
      />
      <p className={cardStyles.description}>Title or description</p>
      <p className={cardStyles.price}>&#8377; 1999</p>
      <Button bgColor="purple" color="white">
        Hello
      </Button>
    </div>
  );
};
