import { createContext } from "react";

export const CartContext = createContext({
  cartMeals : [],
  setCartMeals : () => {},
  onAddToCart : () => {}
});