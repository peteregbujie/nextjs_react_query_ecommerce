import { dehydrate, QueryClient } from "react-query";
import Banner from "../components/Banner";
import useFetchProducts from "../utils/rqHooks";

export default function Home() {
 return (
  <>
   <Banner />
  </>
 );
}

export async function getServerSideProps() {
 const queryClient = new QueryClient();

 // Use the prefetchQuery method to prefetch the results of a query to be placed into the cache
 await queryClient.prefetchQuery("products", useFetchProducts);

 // Pass data to the page via props
 return {
  props: {
   dehydratedState: dehydrate(queryClient),
  },
 };
}
