import Image from "next/image";
import Link from "next/link";
import useFetchProducts from "../utils/rqHooks";

export const Products = () => {
 const { data: products } = useFetchProducts();
 return (
  <>
   {products && (
    <div className="bg-white">
     <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>

      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
       {products.map((product) => (
        <Link
         href={`/product/${product.id}`}
         key={product.name}
         className="group"
        >
         <div>
          <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
           <Image
            src={product.images[0]}
            alt={product.slug}
            className="object-cover object-center w-full h-full group-hover:opacity-75"
            height="400px"
            width="400px"
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
