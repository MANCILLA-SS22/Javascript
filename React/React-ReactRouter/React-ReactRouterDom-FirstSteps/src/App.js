import { createBrowserRouter, RouterProvider/* , createRoutesFromElements, Route */ } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import ProductsPage from "./pages/Products.jsx";
import RootLayout from "./pages/Root.jsx";
import ErrorPage from "./pages/Error.jsx";
import ProductDetailPage from "./pages/ProductDetail.jsx";

// Method 1
// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<Home/>}/>
//     <Route path="/products" element={<ProductsPage/>}/>
//   </Route>
// );

// const router = createBrowserRouter(routeDefinitions);

//Method 2

const router = createBrowserRouter([
  {
    path: "/", 
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    children:[ //Those are all absolute paths because they start with a slash. This means that they're always seen from after the domain name.
      {index: true,  element: <HomePage/> }, // = path: "/"
      {path: "/products", element: <ProductsPage/> }, 
      {path: "/products/:productId", element: <ProductDetailPage/>} 
    ]
  },
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
