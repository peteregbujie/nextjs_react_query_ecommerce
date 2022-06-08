import Cookies from "js-cookie";

// Save the cartItems to browser cookie
const Storage = (cartItems) => {
 Cookies.set(
  "cartItems",
  JSON.stringify(cartItems.length > 0 ? cartItems : [])
 );
};

// calculate the total price of the items in the cart and the total quantity of the items in the cart
export const calculateTotal = (cartItems) => {
 Storage(cartItems);
 let itemCount = cartItems.reduce(
  (total, product) => total + product.quantity,
  0
 );
 let total = cartItems
  .reduce((total, product) => total + product.price * product.quantity, 0)
  .toFixed(2);
 return { itemCount, total };
};

const CartReducer = (state, action) => {
 switch (action.type) {
  case "CART_ADD_PRODUCT": {
   const newItem = action.payload;
   const productExistsInCart = state.cart.cartItems.find(
    (product) => product._id === newItem._id
   );
   const cartItems = productExistsInCart
    ? state.cart.cartItems.map((product) =>
       product.name === productExistsInCart.name ? newItem : product
      )
    : [...state.cart.cartItems, newItem];

   return {
    ...state,
    ...calculateTotal(cartItems),
    cart: { ...state.cart, cartItems },
   };
  }

  case "CHANGE_CART_QTY": {
   const cartItems = state.cart.cartItems.filter((product) =>
    product._id === action.payload.id
     ? (product.quantity = action.payload.quantity)
     : product.quantity
   );
   return {
    ...state,
    ...calculateTotal(cartItems),
    cart: { ...state.cart, cartItems },
   };
  }

  case "CART_REMOVE_PRODUCT": {
   const cartItems = state.cart.cartItems.filter(
    (product) => product._id !== action.payload._id
   );

   return {
    ...state,
    ...calculateTotal(cartItems),
    cart: { ...state.cart, cartItems },
   };
  }

  case "CLEAR_CART": {
   return {
    ...state,
    ...calculateTotal([]),
    cart: { ...state.cart, cartItems: [] },
   };
  }

  //Return the state if the action type is not found
  default:
   return state;
 }
};

export default CartReducer;
