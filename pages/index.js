import { dehydrate, QueryClient } from "react-query";
import Products from "../components/Products";
import { fetchProducts } from "../utils/rqHooks";

export default function Home() {
 return <Products />;
}

export async function getServerSideProps() {
 const queryClient = new QueryClient();

 // Use the prefetchQuery method to prefetch the results of a query to be placed into the cache
 await queryClient.prefetchQuery("products", fetchProducts);

 // Pass data to the page via props
 return {
  props: {
   dehydratedState: dehydrate(queryClient),
  },
 };
}
