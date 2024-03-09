import Users from "../components/pages/fetchingConHook/Users";
import Form from "../components/pages/Form/Form";
import CartContainer from "../components/pages/cart/CartContainer"
import CheckoutContainer from "../components/pages/checkout/CheckoutContainer";
import FirebaseAuth from "../components/pages/firebaseAuth/FirebaseAuth";
import FormFormik from "../components/pages/formFormik/FormFormik";
import ItemListContainer from "../components/pages/itemListContainer/ItemListContainer"
import ProductDetailContainer from "../components/pages/productDetail/ProductDetailContainer"
import Home from "../components/pages/home/Home";

export const MenuRoutes = [
    {
        id: "home",
        path:"/",
        Element: Home
    },
    {
        id: "products",
        path:"/products",
        Element: ItemListContainer
    },
    {
        id: "categories",
        path:"/category/:categoryName",
        Element: ItemListContainer 
    },
    {   //PARTE 1. :num_id  se lee como "algo mas" y puede ser cualquier nombre, no necesariamente "id". Permite que la barra de navegacion, muestre con una "/", el nombre de lo que vendra siendo la parte dinamica. En este caso, como manejaremos el id de productMocks, entonces tendremos algo como: itemDetail/2.
        id: "itemDetail",
        path:"/itemDetail/:num_id", 
        Element: ProductDetailContainer 
    },
    {
        id: "carrito",
        path:"/carrito",
        Element: CartContainer
    },
    {
        id: "users",
        path:"/users",
        Element: Users
    },
    {
        id: "form",
        path:"/form",
        Element: Form
    },
    {
        id: "formik",
        path:"/formik",
        Element: FormFormik
    },
    {
        id: "checkout",
        path:"/checkout",
        Element: CheckoutContainer
    },
    {
        id: "firebase-auth",
        path:"/firebase-auth",
        Element: FirebaseAuth
    }

    //falta crear una ruta login y registro 
];
/* El nombre del id puede ser cualquiera. Element debe siempre iniciar con mayuscula porque cuando se renderizan como HTML, estos siempre deben tener esta propiedad. Es decir, 
en el App, cuando estamos mapeando en la linea 13 y tenemos element={<Element/>}, es bien sabido que lo que esta dentro de los </> es una etiqueta HTML, las cuales siempre
inician con mayuscula. */
