import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "../../components/cart/context/CartContext";
import { useFetchProductDetails } from "../../utils/rqHooks";
import { useMounted } from "../../utils/useMounted";

export default function Product() {
 const router = useRouter();
 const { slug } = router.query;

 const { data: product } = useFetchProductDetails(slug);
 const { hasMounted } = useMounted();
 const { state, dispatch } = useContext(CartContext);

 const {
  cart: { cartItems },
 } = state;

 const AllCartItems = hasMounted ? cartItems : "";

 const addToCartHandler = () => {
  const productExistsInCart = AllCartItems.find(
   (item) => item._id === product._id
  );
  const quantity = productExistsInCart ? productExistsInCart.quantity + 1 : 1;
  if (product.qtyInStock < quantity) {
   window.alert("product is out of Stock");
   return;
  }
  dispatch({ type: "CART_ADD_PRODUCT", payload: { ...product, quantity } });
  router.push("/cart");
 };

 return (
  <>
   {product && (
    <div className="bg-white">
     <div className="pt-6">
      {/* Image gallery */}
      <div className="max-w-2xl mx-auto mt-6 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
       <div className="hidden overflow-hidden rounded-lg aspect-w-3 aspect-h-4 lg:block">
        <Image
         src={product.images[0]}
         alt={product.slug}
         layout="fill"
         objectFit="cover"
         className="object-cover object-center w-full h-full"
        />
       </div>
       <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        <div className="overflow-hidden rounded-lg aspect-w-3 aspect-h-2">
         <Image
          src={product.images[1]}
          alt={product.slug}
          layout="fill"
          objectFit="cover"
          className="object-cover object-center w-full h-full"
         />
        </div>
        <div className="overflow-hidden rounded-lg aspect-w-3 aspect-h-2">
         <Image
          src={product.images[0]}
          alt={product.slug}
          layout="fill"
          objectFit="cover"
          className="object-cover object-center w-full h-full"
         />
        </div>
       </div>
       <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
        <Image
         src={product.images[1]}
         alt={product.slug}
         layout="fill"
         objectFit="cover"
         className="object-cover object-center w-full h-full"
        />
       </div>
      </div>

      {/* product info */}
      <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
       <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
         {product.name}
        </h1>
       </div>

       {/* Options */}
       <div className="mt-4 lg:mt-0 lg:row-span-3">
        <h2 className="sr-only">product information</h2>
        <p className="text-3xl text-gray-900">${product.price}</p>

        <div className="mt-10">
         <button
          disabled={product.qtyInStock < 0}
          onClick={addToCartHandler}
          type="submit"
          className="flex items-center justify-center w-full px-8 py-3 mt-10 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
         >
          Add to Cart
         </button>
        </div>
       </div>

       <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        {/* Description and details */}
        <div>
         <h3 className="sr-only">Description</h3>

         <div className="space-y-6">
          <p className="text-base text-gray-900">{product.description}</p>
         </div>
        </div>

        <div className="mt-10">
         <h2 className="text-sm font-medium text-gray-900">BRAND</h2>

         <div className="mt-4 space-y-6">
          <p className="text-sm text-gray-600">{product.brand}</p>
         </div>
        </div>

        <div className="mt-10">
         <h2 className="text-sm font-medium text-gray-900">CATEGORY</h2>

         <div className="mt-4 space-y-6">
          <p className="text-sm text-gray-600">
           {product.category.toUpperCase()}
          </p>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   )}
  </>
 );
}
