import { ShoppingBagIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useContext } from "react";
import { useMounted } from "../utils/useMounted";
import { CartContext } from "./cart/context/CartContext";

// const links = [
//  {
//   href: "/",
//   text: "Home",
//  },
// ];

const Navbar = () => {
 const { hasMounted } = useMounted();

 const { state } = useContext(CartContext);
 const {
  cart: { cartItems },
 } = state;

 const AllCartItems = hasMounted ? cartItems : "";

 return (
  <div className="bg-white">
   <div className="flex items-center h-16 max-w-screen-xl gap-8 px-4 mx-auto sm:px-6 lg:px-8">
    <Link href="/">
     <a className="block text-teal-600">
      <span className="sr-only">Home</span>
      <h1 className="font-bold">SHOE PLAZA</h1>
     </a>
    </Link>

    <div className="flex items-center justify-end flex-1 md:justify-between">
     <nav className="hidden md:block" aria-labelledby="header-navigation">
      <h2 className="sr-only" id="header-navigation">
       Header navigation
      </h2>

      <ul className="flex items-center gap-6 text-sm">
       <li>
        <Link href="/products">
         <a className="text-gray-500 transition hover:text-gray-500/75">
          Products
         </a>
        </Link>
       </li>
      </ul>
     </nav>

     <div className="flex items-center gap-4">
      <div className="flow-root ml-4 lg:ml-6">
       <Link href="/cart">
        <a href="#" className="flex items-center p-2 -m-2 group">
         <ShoppingBagIcon
          className="flex-shrink-0 w-6 h-6 text-gray-700 group-hover:text-gray-800"
          aria-hidden="true"
         />
         <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {AllCartItems.length}
         </span>
        </a>
       </Link>
      </div>

      <button className="block p-2.5 text-gray-600 transition bg-gray-100 rounded md:hidden hover:text-gray-600/75">
       <span className="sr-only">Toggle menu</span>
       <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
       >
        <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M4 6h16M4 12h16M4 18h16"
        />
       </svg>
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};
export default Navbar;
