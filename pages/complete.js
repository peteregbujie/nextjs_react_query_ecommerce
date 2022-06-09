import { CheckIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { CartContext } from "../components/cart/context/CartContext";
import { useFetchCheckOutDetails } from "../utils/rqHooks";

const Complete = () => {
 const {
  query: { session_id },
 } = useRouter();
 const { dispatch } = useContext(CartContext);

 const { data, error } = useFetchCheckOutDetails(session_id);

 useEffect(() => {
  if (data) {
   dispatch({ type: "CLEAR_CART" });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [data]);

 return (
  <div className="container px-6 py-12 mx-auto text-center xl:max-w-screen-xl">
   {error ? (
    <div className="max-w-md p-2 mx-auto rounded-md bg-rose-100 text-rose-500">
     <p className="text-lg">Sorry, something went wrong!</p>
    </div>
   ) : !data ? (
    <div className="max-w-md p-2 mx-auto text-gray-500 bg-gray-100 rounded-md">
     <p className="text-lg animate-pulse">Loading...</p>
    </div>
   ) : (
    <div className="max-w-lg px-8 py-4 mx-auto bg-gray-100 rounded-md">
     <h2 className="flex flex-col items-center space-x-1 text-4xl font-semibold">
      <CheckIcon className="flex-shrink-0 w-12 h-12 text-green-600" />
      <span>Thanks for your order!</span>
     </h2>
    </div>
   )}
  </div>
 );
};

export default Complete;
