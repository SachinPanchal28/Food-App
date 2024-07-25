import { useContext } from "react";
import { CartContext } from "../store/CartContext";

const Meal = ({ meal }) => {
  const {onAddToCart} = useContext(CartContext);

  return (<div className="meal-item">
    <article >
      <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
      <h3>{meal.name}</h3>
      <p className='meal-item-price'>${meal.price}</p>
      <span className="meal-item-description">{meal.description}</span>
      <button onClick={() => onAddToCart(meal.id)} type="button" className="button meal-item-actions">Add to Cart</button>
    </article>

  </div>);
}

export default Meal;