import Head from "next/head";
import Navbar from "./Navbar";

export default function Layout({ children }) {
 return (
  <>
   <Head>
    <title>Store</title>
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <Navbar />
   <main className="flex flex-row">
    <section className="w-[1024px]">{children}</section>
   </main>
  </>
 );
}
