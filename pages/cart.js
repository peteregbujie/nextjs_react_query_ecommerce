/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import CartItem from "components/cart/CartItem";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { CartContext } from "../components/cart/context/CartContext";
import getStripe from "../utils/get-stripe";
import { useMounted } from "../utils/useMounted";

function Cart() {
 const { hasMounted } = useMounted();
 const router = useRouter();

 const { state, dispatch } = useContext(CartContext);
 const {
  cart: { cartItems },
  itemCount,
  total,
 } = state;

 const AllCartItems = hasMounted ? cartItems : "";

 const [redirecting] = useState(false);

 const redirectToCheckout = async () => {
  // Create Stripe checkout
  const {
   data: { id },
  } = await axios.post("/api/checkout_sessions", {
   items: AllCartItems.map(({ name, price, quantity, images }) => ({
    name,
    amount: price * 100,
    quantity,
    images: [images[0]],
    currency: "USD",
   })),
  });

  // Redirect to checkout
  const stripe = await getStripe();
  await stripe.redirectToCheckout({ sessionId: id });
 };

 /* This react app uses hydration technique to render a DOM that is already been built, with all our components rendered as HTML. 
 So, using data (cartItems etc) stored in the browser cookie will cause hydration issues because items stored in the browser are 
 not available during build time.
React expects that the rendered content is identical between the server and the client.
Use the useMount() hook to make the pre-rendered content and the content in the client the same.
The solution is to display the cartItems after the first render and start with no items initially*/

 const clearCartHandler = () => {
  dispatch({ type: "CLEAR_CART" });
 };

 const shoppingHandler = (e) => {
  e.preventDefault();
  router.push("/");
 };

 return (
  <>
   {AllCartItems.length === 0 ? (
    <div className="container mt-10 ml-10">
     <h1 className="text-2xl font-semibold">Shopping Cart</h1>
     <h4 className="container mx-auto mt-10">Cart is empty</h4>

     <a
      href="#"
      className="flex mt-10 text-sm font-semibold text-indigo-600"
      onClick={shoppingHandler}
     >
      <svg
       className="w-4 mr-2 text-indigo-600 fill-current"
       viewBox="0 0 448 512"
      >
       <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
      </svg>
      Continue Shopping
     </a>
    </div>
   ) : (
    <div className="bg-gray-100">
     <div className="container mx-auto my-auto mt-10">
      <div className="flex my-10">
       <div className="w-4/6 px-4 py-10 bg-white lg:w-3/4">
        <div className="flex justify-between pb-8 border-b">
         <h1 className="text-2xl font-semibold">Shopping Cart</h1>
        </div>
        <div className="flex mt-10 mb-5">
         <h3 className="w-2/5 text-xs font-semibold text-gray-600 uppercase">
          Product Details
         </h3>
         <h3 className="w-1/5 text-xs font-semibold text-center text-gray-600 uppercase">
          Qty
         </h3>
         <h3 className="w-1/5 text-xs font-semibold text-center text-gray-600 uppercase">
          Unit Price
         </h3>
         <h3 className="w-1/5 text-xs font-semibold text-center text-gray-600 uppercase">
          Total
         </h3>
        </div>

        <ul role="list" className="-my-6 divide-y divide-gray-200">
         {AllCartItems.map((product) => (
          <CartItem key={product._id} product={product} />
         ))}
        </ul>

        <a
         href="#"
         className="flex mt-10 text-sm font-semibold text-indigo-600"
         onClick={shoppingHandler}
        >
         <svg
          className="w-4 mr-2 text-indigo-600 fill-current"
          viewBox="0 0 448 512"
         >
          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
         </svg>
         Continue Shopping
        </a>
       </div>

       <div id="summary" className="w-2/6 px-8 py-10 lg:w-1/4">
        <h1 className="pb-8 text-2xl font-semibold border-b">Order Summary</h1>
        <div className="flex justify-between mt-10 mb-5">
         <span className="text-sm font-semibold uppercase">Total Quantity</span>
         <span className="text-sm font-semibold">{itemCount}</span>
        </div>

        <button
         onClick={clearCartHandler}
         className="px-5 py-2 text-sm text-white uppercase bg-red-500 hover:bg-red-600"
        >
         Clear Cart
        </button>
        <div className="mt-8 border-t">
         <div className="flex justify-between py-6 text-sm font-semibold uppercase">
          <span>Total cost</span>
          <span>${total}</span>
         </div>
         <button
          onClick={redirectToCheckout}
          disabled={redirecting}
          className="px-6 py-2 mt-4 text-white transition-colors bg-indigo-600 border border-indigo-600 rounded hover:bg-rose-600 hover:border-rose-600 focus:ring-4 focus:ring-opacity-50 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-500 max-w-max"
         >
          {redirecting ? "Redirecting..." : "Go to Checkout"}
         </button>
        </div>
       </div>
      </div>
     </div>
    </div>
   )}
  </>
 );
}

export default Cart;
