// usequery Hooks

import { useQuery } from "react-query";
const { URL } = process.env;

export const fetchProducts = async () => {
 const res = await fetch(URL + "/api/products");
 return res.json();
};

const useFetchProducts = () => {
 return useQuery("products", fetchProducts, {
  staleTime: 300000 /* the staletime option will cache the data */,
 });
};
export default useFetchProducts;
