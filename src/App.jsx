import { useState, useEffect } from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import { CartContext } from "./store/CartContext";
import { getAvailableMeals } from './http';
import Error from "./components/Error";
import Modal from "./components/Modal";
import Cart from "./components/Cart";

function App() {

  const [availableMeals, setAvailableMeals] = useState([]);
  const [error, setError] = useState('');
  const [cartMeals, setCartMeals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getMeals = async () => {
      try {
        const meals = await getAvailableMeals();
        setAvailableMeals(meals);
      } catch (error) {
        setError(error.message);
      }
    }
    getMeals();
  }, []);

  const addMealToCart = (mealId) => {
    if (cartMeals.some(meal => meal.id === mealId))
      return;
    setCartMeals(prevCartItems => {
      const addedMeal = availableMeals.find(meal => meal.id === mealId);
      return addedMeal ? [addedMeal, ...prevCartItems] : prevCartItems;
    })

  }
  // console.log(cartMeals);

  if(cartMeals.some(meal => meal.quantity <= 0)){
    setCartMeals(prevMeals => {
      return [...prevMeals.filter(meal => meal.quantity > 0)];
    });
  }


  const showCartItems = () => {
    setIsModalOpen(true);
  }

  const closeCartModal = () => {
    setIsModalOpen(false);
  }

  const cartContextValue = {
    cartMeals,
    setCartMeals,
    onAddToCart : addMealToCart,
  };

  return (
    <CartContext.Provider value={cartContextValue} >

      <Modal isOpen={isModalOpen} onClose={closeCartModal}   >
        <Cart cartItems={cartMeals} onClose={closeCartModal}  />
      </Modal>

      <Header cartItemsCount={cartMeals.length} showCartItems={showCartItems} />
      {error && <Error errorMsg={error} />}
      {!error && <Home availableMeals={availableMeals} />}
    </CartContext.Provider>
  );
}

export default App;
