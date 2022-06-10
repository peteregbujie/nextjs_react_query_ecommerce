import Image from "next/image";
import Link from "next/link";
import React from "react";
import banner1 from "../public/images/banner1.jpg";
import banner2 from "../public/images/banner2.jpg";

function Banner() {
 return (
  <aside>
   <div className="px-4 py-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
     <div className="p-8 text-center text-white bg-indigo-600 sm:col-span-2 sm:p-16 lg:py-24">
      <div className="max-w-lg mx-auto space-y-8">
       <p className="text-3xl font-bold sm:text-4xl">
        We make great shoes happen.
       </p>

       <p className="font-bold">
        Shoes for every place you need to go to. For all walks of Life. Your
        feet will never look the same again.Life is too short for bad
        shoes.Enjoy the shiny things.
       </p>
       <Link href="/products">
        <a className="inline-flex items-center px-5 py-3 mt-8 font-medium text-indigo-600 bg-white rounded-lg hover:opacity-75">
         See our Collection
         <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 w-4 h-4 ml-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
         >
          <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth="2"
           d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
         </svg>
        </a>
       </Link>
      </div>
     </div>

     <div className="relative h-64 lg:order-first lg:h-full">
      <Image
       src={banner1}
       alt="banner1"
       layout="fill"
       className="absolute inset-0 object-cover w-full h-full"
      />
     </div>

     <div className="relative h-64 lg:h-full">
      <Image
       src={banner2}
       alt="banner2"
       layout="fill"
       className="absolute inset-0 object-cover w-full h-full"
      />
     </div>
    </div>
   </div>
  </aside>
 );
}

export default Banner;
