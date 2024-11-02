//Enrutado con react router (con metodo dinamica)
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Layout from './components/layout/Layout';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {MenuRoutes} from "./routes/MenuRoutes"
import CartContextProvider from './context/CartContext';

function App() {
  return(
    <BrowserRouter>
    <CartContextProvider>
      <Routes>
        <Route element={<Layout/>}>
          {
            MenuRoutes.map( ({id, path, Element}) => (<Route key={id} path={path} element={<Element/>}/>))
          }
        </Route>
        <Route path='*' element={<h1>404 not found</h1>}/>
      </Routes>
    </CartContextProvider>
    </BrowserRouter>
  )
}

export default App;

/* //Enrutado con react router (con metodo estatico)
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemListContainer from "./components/pages/itemListContainer/ItemListContainer";
import ProductDetailContainer from "./components/pages/productDetail/ProductDetailContainer";
import CartContainer from "./components/pages/cart/CartContainer";
import Layout from "./components/layout/Layout";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<ItemListContainer/>} />
          <Route path='/category/:categoryName' element={<ItemListContainer/>} />
          <Route path='/itemDetail/:num_id' element={<ProductDetailContainer/>} /> //PARTE 1. :num_id  se lee como "algo mas" y puede ser cualquier nombre, no necesariamente "id". Permite que la barra de navegacion, muestre con una "/", el nombre de lo que vendra siendo la parte dinamica. En este caso, como manejaremos el id de productMocks, entonces tendremos algo como: itemDetail/2.
          <Route path='/carrito' element={<CartContainer/>}/>
        </Route>
        <Route path='*' element={<h1>404 not found</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App; */

/* // Enrutado sin react router
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from './components/layout/navbar/Navbar';
import ItemListContainer from './components/pages/itemListContainer/ItemListContainer';
import ProductDetailContainer from './components/pages/productDetail/ProductDetailContainer';
import Users from './components/Users';
import Comments from './components/Comments';
import Posts from './components/Posts';
import Fetching from './components/pages/fetching/Fetching';
import FetchingDeDatosContainer from './components/pages/fetchingDeDatos/FetchingDeDatosContainer';
import { ItemCount } from './components/itemCount';


function App() {
  return(
    <div>
      <Navbar>
        <ItemListContainer/>
        <ProductDetailContainer/>
        <ItemCount/>
        <FetchingDeDatosContainer/>
        <Fetching/>
        <Users/>
        <Comments/> 
        <Posts/>
      </Navbar>
      
    </div>
  )
}

export default App; */
