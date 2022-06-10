<b>NExtJS Ecommerce APP</b>
Online store built with NextJs, MongoDB database, TailwindCSS for styling, React Query for data fetching, and Stripe checkout to complete order.

React Query lets you fetch any number of queries you want during any of the Next.js pre-rendering steps and then dehydrate those queries. This allows you to pre-render your markup that will be available with all the data on page load and once the page renders on the client, React Query will hydrate those dehydrated queries with the full functionality of the library.

<b>Features</b>
Seed products into MongoDB database</br>
Create endpoint to fetch products from the server.</br>
Fetch list of products</br>
Fetch single product from react query cache . This reduces the amount of fetch requests.</br>
Create a global State using React context and useReducer hook.</br>
Add Items to cart. Items added to cart are stored in global state using the browser cookie.</br>
Use stripe Checkout to complete checkout.</br>

<b>Getting Started</b>

1. Clone the repository and install dependencies
   git clone https://github.com/peteregbujie/nextjs_react_query_ecommerce
   cd nextjs_react_query_ecommerce
   npm install
2. Configure your local environment
   Rename the .env.example file in this directory to .env (which will be ignored by Git):

Add your own values for all the environment variables.

3. Start the application
   To run your site locally, use:

npm run dev
To run it in production mode, use:

npm run build
npm run start
