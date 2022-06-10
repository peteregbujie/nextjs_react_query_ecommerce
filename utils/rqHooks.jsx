// Hooks for data fetching using react-query

import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const client = axios.create({
 baseURL: "http://localhost:3000/",
});

//fetch checkout session with session id
const fetchCheckOut = async (session_id) => {
 const { data } = await client.get(`/api/checkout_sessions/${session_id}`);
 return data;
};

//custom hook to fetch checkout
export const useFetchCheckOutDetails = (session_id) => {
 return useQuery(["checkout", session_id], () => fetchCheckOut(session_id));
};

const fetchProduct = async (slug) => {
 const { data } = await client.get(`/api/products/${slug}`);
 return data;
};

//custom hook to fetch single item from catch
export const useFetchProductDetails = (slug) => {
 return useQuery(["product", slug], () => fetchProduct(slug), {
  staleTime: 50000,
 });
};

export const fetchProducts = async () => {
 const { data } = await client.get("/api/products");
 return data;
};

//custom hook to fetch all products and store in cache
const useFetchProducts = () => {
 const queryClient = useQueryClient();
 return useQuery("products", fetchProducts, {
  staleTime: 50000,
  onSuccess: (products) => {
   /* The onSuccess function will fire any time the query successfully fetches new data or the cache is updated via setQueryData.*/
   products.forEach((product) => {
    queryClient.setQueryData(["product", product.slug], product);
   });
  },
 });
};
export default useFetchProducts;
