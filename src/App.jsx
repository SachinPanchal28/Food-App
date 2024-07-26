import { useState, useEffect, useCallback } from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import { CartContext } from "./store/CartContext";
import { getAvailableMeals, submitOrder } from "./http";
import Error from "./components/Error";
import Modal from "./components/Modal";
import Cart from "./components/Cart";
import CheckoutDetails from "./components/CheckoutDetails";
import SuccessModal from "./components/SuccessModal";

function App() {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [error, setError] = useState("");
  const [cartMeals, setCartMeals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [succesModal, setSuccesModal] = useState(false);
  useEffect(() => {
    const getMeals = async () => {
      try {
        const meals = await getAvailableMeals();
        setAvailableMeals(meals);
      } catch (error) {
        setError(error.message);
      }
    };
    getMeals();
  }, []);

  const addMealToCart = (mealId) => {
    if (cartMeals.some((meal) => meal.id === mealId)) return;
    setCartMeals((prevCartItems) => {
      const addedMeal = availableMeals.find((meal) => meal.id === mealId);
      if (addedMeal) addedMeal.quantity = 1;
      return addedMeal ? [...prevCartItems, addedMeal] : prevCartItems;
    });
  };
  // console.log(cartMeals);

  if (cartMeals.some((meal) => meal.quantity <= 0)) {
    setCartMeals((prevMeals) => {
      return [...prevMeals.filter((meal) => meal.quantity > 0)];
    });
  }

  const showCartItems = () => {
    setIsModalOpen(true);
  };

  const closeCartModal = () => {
    setIsModalOpen(false);
  };

  const showCheckoutModal = () => {
    setIsModalOpen(false);
    setCheckoutModal(true);
  };
  const hideCheckoutModal = (isCancel) => {
    if (isCancel) setIsModalOpen(true);
    setCheckoutModal(false);
  };

  const handleSubmitOrder = async (customerData) => {
    customerData["postal-code"] = customerData.postalCode;
    delete customerData.postalCode;
    const order = { customer: customerData, items: cartMeals };
    try {
      const orderResposeMsg = await submitOrder(order);
      if (orderResposeMsg === "Order created!") {
        hideCheckoutModal();
        setCartMeals([]);
        setSuccesModal(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const hideSuccessModal = () => {
    setSuccesModal(false);
  };

  console.log("===============App Component================");
  const cartContextValue = {
    cartMeals,
    setCartMeals,
    onAddToCart: addMealToCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      <Modal isOpen={isModalOpen} onClose={closeCartModal}>
        <Cart
          cartItems={cartMeals}
          onClose={closeCartModal}
          onCheckout={showCheckoutModal}
        />
      </Modal>
      <Modal isOpen={checkoutModal} onClose={() => hideCheckoutModal(false)}>
        <CheckoutDetails
          onCancel={() => hideCheckoutModal(true)}
          submitOrder={handleSubmitOrder}
        />
      </Modal>
      <Modal isOpen={succesModal} onClose={hideSuccessModal}>
        <SuccessModal onOkClick={hideSuccessModal} />
      </Modal>

      <Header cartItemsCount={cartMeals.length} showCartItems={showCartItems} />
      {error && <Error errorMsg={error} />}
      {!error && <Home availableMeals={availableMeals} />}
    </CartContext.Provider>
  );
}

export default App;
