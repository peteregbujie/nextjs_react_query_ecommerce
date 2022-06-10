import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { Fragment, useContext, useEffect, useState } from "react";
import { useFetchProductDetails } from "../../utils/rqHooks";
import { CartContext } from "./context/CartContext";

function CartItem({ product }) {
 const [selected, setSelected] = useState(1);
 const { dispatch } = useContext(CartContext);
 const inStock = [...Array(product.qtyInStock).keys()];

 const { data: productDB } = useFetchProductDetails(product.slug);

 const changeCartQtyHandler = (product, selected) => {
  if (productDB?.qtyInStock < selected) {
   window.alert("Product is out of stock");
   return;
  }
  dispatch({
   type: "CHANGE_CART_QTY",
   payload: {
    id: product._id,
    quantity: selected,
   },
  });
 };

 useEffect(() => {
  changeCartQtyHandler(product, selected);
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [selected]);

 const handleRemove = (product) => {
  dispatch({ type: "CART_REMOVE_PRODUCT", payload: product });
 };

 return (
  <li key={product._id}>
   <div className="flex items-center px-6 py-5 -mx-8 hover:bg-gray-100">
    <div className="flex w-2/5">
     <div className="w-20">
      <Image
       src={product.images[0]}
       alt={product.slug}
       width={150}
       height={150}
       className="h-24"
      />
     </div>
     <div className="flex flex-col justify-between flex-grow ml-4">
      <span className="text-sm font-bold">{product.name}</span>
      <span className="text-xs text-red-500">{product.brand}</span>
      <a
       onClick={() => handleRemove(product)}
       href="#"
       className="text-xs font-semibold text-gray-500 hover:text-red-500"
      >
       Remove
      </a>
     </div>
    </div>

    <div className="flex justify-center w-1/5">
     <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
       <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span className="block truncate">{selected.name}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
         <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </span>
       </Listbox.Button>
       <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
       >
        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
         {inStock.map((number) => (
          <Listbox.Option
           key={number + 1}
           className={({ active }) =>
            `relative cursor-default select-none py-2 pl-[5px] pr-[5px] ${
             active ? "bg-amber-100 text-amber-900" : "text-gray-900"
            }`
           }
           value={number + 1}
          >
           {({ selected }) => (
            <>
             <span
              className={`block truncate ${
               selected ? "font-medium" : "font-normal"
              }`}
             >
              {number + 1}
             </span>
             {selected ? (
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
               <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
             ) : null}
            </>
           )}
          </Listbox.Option>
         ))}
        </Listbox.Options>
       </Transition>
      </div>
     </Listbox>
    </div>

    <span className="w-1/5 text-sm font-semibold text-center">
     ${product.price}
    </span>
    <span className="w-1/5 text-sm font-semibold text-center">
     ${product.quantity * product.price}
    </span>
   </div>
  </li>
 );
}

export default CartItem;
