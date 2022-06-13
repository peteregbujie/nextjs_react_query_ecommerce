import Image from "next/image";
import Link from "next/link";
import { dehydrate, QueryClient } from "react-query";
import useFetchProducts, { fetchProducts } from "../utils/rqHooks";

export const Products = () => {
 const { data: products, isLoading } = useFetchProducts();
 console.log(isLoading);

 return (
  <>
   {products && (
    <div className="bg-white">
     <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>

      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
       {products.map((product) => (
        <Link
         href={`/product/${product.slug}`}
         key={product.name}
         className="group"
        >
         <div>
          <div className="w-full h-[250px] overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
           <Image
            src={product.images[0]}
            alt={product.slug}
            layout="fill"
            objectFit="cover"
            className="group-hover:opacity-75"
           />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">
           {product.price}
          </p>
         </div>
        </Link>
       ))}
      </div>
     </div>
    </div>
   )}
  </>
 );
};

export default Products;

export async function getServerSideProps() {
 const queryClient = new QueryClient();

 // Use the prefetchQuery method to prefetch the results of a query to be placed into the cache
 await queryClient.prefetchQuery("products", fetchProducts);

 return {
  props: {
   dehydratedState: dehydrate(queryClient),
  },
 };
}
