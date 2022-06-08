import Cookies from "js-cookie";
import { createContext, useReducer } from "react";
import CartReducer, { calculateTotal } from "./CartReducer";

export const CartContext = createContext(""); // create context

// grab cartItems from the browser cookie.
const storedItems = Cookies.get("cartItems")
 ? JSON.parse(Cookies.get("cartItems"))
 : [];

const initialState = {
 cart: {
  cartItems: storedItems,
 },
 ...calculateTotal(storedItems),
};

export function CartProvider({ children }) {
 const [state, dispatch] = useReducer(CartReducer, initialState);

 return (
  <CartContext.Provider value={{ state, dispatch }}>
   {children}
  </CartContext.Provider>
 );
}
