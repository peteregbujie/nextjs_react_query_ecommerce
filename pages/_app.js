import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { CartProvider } from "../components/cart/context/CartContext";
import Layout from "../components/Layout";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
 const [queryClient] = useState(() => new QueryClient());
 return (
  <QueryClientProvider client={queryClient}>
   <Hydrate state={pageProps.dehydratedState}>
    <CartProvider>
     <Layout>
      <Component {...pageProps} />
     </Layout>
    </CartProvider>
    <ReactQueryDevtools initialIsOpen={false} />
   </Hydrate>
  </QueryClientProvider>
 );
}
