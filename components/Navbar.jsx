import Link from "next/link";
import { useState } from "react";

const links = [
 {
  href: "/",
  text: "Home",
 },
];

const Navbar = () => {
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
      <ul className="flex flex-col items-start w-full list-none lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto lg:items-center lg:h-auto ">
       {links.map((link) => (
        <li key={link.href}>
         <Link href={link.href}>
          <a className="items-center justify-center w-full px-3 py-2 font-bold text-white rounded lg:inline-flex lg:w-auto hover:bg-blue-600 hover:text-white ">
           {link.text}
          </a>
         </Link>
        </li>
       ))}
      </ul>
     </div>
    </div>
   </nav>
  </>
 );
};
export default Navbar;
