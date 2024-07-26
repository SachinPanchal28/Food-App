import { useContext, useState } from "react";
import { CartContext } from "../store/CartContext";

const CartItem = ({ meal }) => {
  const { cartMeals, setCartMeals } = useContext(CartContext);
  const { id: mealId, name: mealName, price: mealPrice, quantity } = meal;
  const [mealQuantity, setMealQuantity] = useState(quantity || 1);

  const increseQuantityByOne = () => {
    setMealQuantity((prevQuantity) => prevQuantity + 1);
    setCartMeals((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === mealId) {
          return { ...item, quantity: item.quantity ? item.quantity + 1 : 2 };
        }
        return item;
      });
    });
  };

  const decreseQuantityByOne = () => {
    setMealQuantity((prevQuantity) => prevQuantity - 1);
    setCartMeals((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === mealId) {
          return { ...item, quantity: item.quantity ? item.quantity - 1 : 0 };
        }
        return item;
      });
    });
  };
  console.log("===============Cart Item Component================");

  return (
    <li className="cart-item">
      <p>
        <span>{mealName}</span>
        <span> - {mealQuantity} &times; </span>
        <span>${mealPrice}</span>
      </p>
      <div className="cart-item-actions">
        <button onClick={increseQuantityByOne}>&#43;</button>
        {mealQuantity}
        <button onClick={decreseQuantityByOne}>&minus;</button>
      </div>
    </li>
  );
};

export default CartItem;
