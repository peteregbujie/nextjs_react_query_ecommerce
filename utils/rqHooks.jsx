// usequery Hooks

import { useQuery } from "react-query";

const useFetchProducts = () => {
 return useQuery("products", () => fetch("/api/products"), {
  staleTime: 500000 /* the staletime option will cache the data */,
 });
};
export default useFetchProducts;
