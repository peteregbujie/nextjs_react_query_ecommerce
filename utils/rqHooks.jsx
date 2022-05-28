// Hooks for data fetching using react-query

import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const client = axios.create({
 baseURL: "http://localhost:3000/",
});

const fetchProduct = async (slug) => {
 const { data } = await client.get(`/api/products/${slug}`);
 return data;
};

export const FetchProductDetails = (slug) => {
 return useQuery(["product", slug], () => fetchProduct(slug), {
  staleTime: 50000,
 });
};

const fetchProducts = async () => {
 const { data } = await client.get("/api/products");
 return data;
};

const useFetchProducts = () => {
 const queryClient = useQueryClient();
 return useQuery("products", fetchProducts, {
  staleTime: 50000,
  onSuccess: (products) => {
   /* The onSuccess function will fire any time the query successfully fetches new data or the cache is updated via setQueryData.*/
   Array.from(products).forEach((product) => {
    queryClient.setQueryData(["product", product.slug], product);
   });
  },
 });
};
export default useFetchProducts;
