// Codigo utilziando Firebase y modificando el useEffect()
// Elemento padre de productDetail
import ProductDetail from "./ProductDetail"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import Swal from 'sweetalert2';
import { db } from "../../../firebaseConfig";  
import {collection, getDoc, doc } from "firebase/firestore"

function ProductDetailContainer(){
  const [productSelected, setProductSelected] = useState({});
  const {addToCart, getTotalQuantityById} = useContext(CartContext);
  const { num_id } = useParams(); //PARTE 2. Con useParams recuperamos el lo contenido en itemDetail/2. Es decir, el numero 2, que es la parte dinamica. Para despues, desplegar la nueva pagina con los detalles del calzado seleccionado. num_id debe ser el mismo nombre de la ruta en la linea 23 en App.js porque es el nombre del parametro dinamico en el mismo.
  const cantidad = getTotalQuantityById(num_id);

  function onAdd( cantidad ){ //No podemos devolver o mandar una variable desde el hijo al padre, SI podemos ejecutar una funcion que existe en el padre en el hijo, y el hijo a traves de los parametros le hace llegar la informacion al padre. Ejecutamos la funcion onAdd en el hijo, y en el hijo, lo que retornara es el "count" que se encuentra en ItemCount.
    let data ={
      ...productSelected,
      quantity: cantidad
    }
    addToCart(data);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto agregado exitosamente',
      showConfirmButton: true,
      timer: 2000
    })
  }

  //Aqui ya no usamos el Number() porque el firebase retorna un id de tipo STRING, a diferencia del id que retornaba el productsMock que retornaba un numero.
  useEffect(() => {
    let itemCollection = collection(db, "products");
    let refDoc = doc(itemCollection, num_id); // con doc() necesitamos dos parametros. El primero es la ubicacion de donde voy a sacar el documento (en este caso, itemCollection), y el segundo es para indicar que es lo que quiero acceder (en este caso, el id).
    getDoc(refDoc)
    .then((res) => {
      setProductSelected({
        ...res.data(), 
        id: res.id //El id del res.id pertenece al que se encuentra en firebase. Mientras que el num_id es el que se recupera de la barra de navegacion con el useParams().
      })
    })
  }, [num_id]);
  
  return (
    <div>
      {
        productSelected.id ? (<ProductDetail productSelected={productSelected} cantidad={cantidad} addToCart={addToCart} onAdd={onAdd}/>) : (<h1>Cargando...</h1>)
      }     
    </div>
  )
}

export default ProductDetailContainer

/* //Codigo sin utilizar Firebase y solamente trabajar con el productsMock
// Elemento padre de productDetail
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { products } from "../../../productsMock";
import ProductDetail from "./ProductDetail"
import { CartContext } from "../../../context/CartContext";
import Swal from 'sweetalert2';

function ProductDetailContainer(){
  
    const {addToCart, getTotalQuantityById} = useContext(CartContext);
    const [productSelected, setProductSelected] = useState({});
    const { num_id } = useParams(); //PARTE 2. Con useParams recuperamos el lo contenido en itemDetail/2. Es decir, el numero 2, que es la parte dinamica. Para despues, desplegar la nueva pagina con los detalles del calzado seleccionado. num_id debe ser el mismo nombre de la ruta en la linea 23 en App.js porque es el nombre del parametro dinamico en el mismo.
    const cantidad = getTotalQuantityById(Number(num_id));

    function onAdd( cantidad ){ //No podemos devolver o mandar una variable desde el hijo al padre, SI podemos ejecutar una funcion que existe en el padre en el hijo, y el hijo a traves de los parametros le hace llegar la informacion al padre. Ejecutamos la funcion onAdd en el hijo, y en el hijo, lo que retornara es el "count" que se encuentra en ItemCount.
        let data ={
          ...productSelected,
          quantity: cantidad
        }
        addToCart(data);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto agregado exitosamente',
          showConfirmButton: true,
          timer: 2000
        }) //42:30
    }

    useEffect(() => {
        let productFind = products.find((evento) => {
            return evento.id === Number(num_id); //Tod0 lo que recuperamos desde la web, en este caso, el id, se recibe como un elemento de tipo string. Por lo que, es necesario convertir ese elemento a un numero.
        });

        const getProduct = new Promise((res) => {
            setTimeout(() => {
              res(productFind)
            }, 500)
        })

        getProduct
        .then((res) => {setProductSelected(res)})
        .catch((err) => {console.log("Error: ", err);});
    }, [num_id]);
    
    //console.log(productSelecteds);

    return (
        <div>
          {
            productSelected.id ? (<ProductDetail productSelected={productSelected} cantidad={cantidad} addToCart={addToCart} onAdd={onAdd}/>) : (<h1>Cargando...</h1>)
          }     
        </div>
    )
}

export default ProductDetailContainer */









/* //Enrutado con forma estatica
import { Badge } from "@mui/material";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./Navbar.modules.css";

const Navbar = () => {
  return (
    <>
      <div className={styles.containerNavbar}>
        <Link to="/">Comision-43240</Link>
        <ul className={styles.categories}>
          <Link to="/">Limpiar filtros</Link>
          <Link to="/category/urbanas">Urbanas</Link>
          <Link to="/category/deportivas">Deportivas</Link>
        </ul>

        <Link to="/carrito">
          <Badge badgeContent={4} color="primary">
            <BsFillCartCheckFill size="30px" />
          </Badge>
        </Link>
      </div>
    </>
  );
};

export default Navbar; */

/* //Sin router
import { useEffect, useState } from "react"
import ProductDetail from "./ProductDetail"
import { products } from "../../../productsMock";

function ProductDetailContainer(){
    const [productSelected, setProductSelected] = useState({});

    let id_N = 3;

    useEffect(() => {

        let productFind = products.find((evento) => {
            console.log(evento.id);
            return evento.id === id_N
        });

        const getProduct = new Promise((res, err) => {
            return res(productFind);
        });

        getProduct
        .then((res) => {setProductSelected(res)})
        .catch((err) => {console.log("Error: ", err);});
    }, [id_N]);

    console.log(productSelected);
    return <ProductDetail productSelected={productSelected}/>
}

export default ProductDetailContainer */

