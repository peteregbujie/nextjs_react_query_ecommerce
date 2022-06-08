import Link from "next/link";
import { useContext, useState } from "react";
import { useMounted } from "../utils/useMounted";
import { CartContext } from "./cart/context/CartContext";

const links = [
 {
  href: "/",
  text: "Home",
 },
];

const Navbar = () => {
 const { hasMounted } = useMounted();

 const { state } = useContext(CartContext);
 const {
  cart: { cartItems },
 } = state;

 const AllCartItems = hasMounted ? cartItems : "";
 console.log(AllCartItems.length);

 const [active, setActive] = useState(false);

 const handleClick = () => {
  setActive(!active);
 };

 return (
  <>
   <nav className="flex flex-wrap items-center p-3 bg-blue-400 ">
    <Link href="/">
     <a className="inline-flex items-center p-2 mr-4 ">
      <span className="text-xl font-bold tracking-wide text-white uppercase">
       Shoe Store
      </span>
     </a>
    </Link>
    <button
     className="inline-flex p-3 ml-auto text-white rounded outline-none hover:bg-blue-600 lg:hidden hover:text-white"
     onClick={handleClick}
    >
     <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       strokeWidth={2}
       d="M4 6h16M4 12h16M4 18h16"
      />
     </svg>
    </button>
    {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
    <div
     className={`${
      active ? "" : "hidden"
     }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
    >
     <div>
      <ul className="flex flex-row w-full list-none justify-evenly lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto lg:items-center lg:h-auto ">
       {links.map((link) => (
        <li key={link.href}>
         <Link href={link.href}>
          <a className="items-center justify-center w-full px-3 py-2 font-bold text-white rounded lg:inline-flex lg:w-auto hover:bg-blue-600 hover:text-white ">
           {link.text}
          </a>
         </Link>
        </li>
       ))}
       <li>
        <Link href="/cart">
         <a>
          {AllCartItems.length > 0 ? (
           <div className="flex">
            <svg
             color="white"
             xmlns="http://www.w3.org/2000/svg"
             className="flex-1 w-6 h-6 mr-0.1"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
             strokeWidth="2"
            >
             <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
             />
            </svg>
            <div className="flex-1 text-white">{AllCartItems.length}</div>
           </div>
          ) : (
           <div></div>
          )}
         </a>
        </Link>
       </li>
      </ul>
     </div>
    </div>
   </nav>
  </>
 );
};
export default Navbar;
