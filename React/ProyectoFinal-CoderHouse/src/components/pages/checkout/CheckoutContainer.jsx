import Checkout from "./Checkout"
import { useFormik } from "formik"
import  *as Yup from "yup"
import { db } from "../../../firebaseConfig"
import {collection, addDoc, updateDoc, doc} from "firebase/firestore"
import { useContext, useState } from "react"
import { CartContext } from "../../../context/CartContext"

function CheckoutContainer() {

  const {cart, getTotalPrice, clearCart} = useContext(CartContext);

  const [orderId, setOrderId] = useState(null);

  const {handleSubmit, handleChange, errors} = useFormik({ //handleSubmit pertenece al formulario, mientras que handleChange pertenece al input.
    initialValues:{
      name:"",
      email:"",
      phone:""
    },

    onSubmit: ( data ) => {
      let order ={
        buyer: data,            //El data recupera el objeto que contiene la info del comprador (name, email y phone)
        items: cart,            //El cart es recuperado de mi contexto, y es el elemento que contiene la info de lo que quiero comprar
        total: getTotalPrice()  //Esta es una funcion proveniente del contexto tambien, la cual recuperara el precio final.
      }

      let ordersCollection = collection(db, "orders"); // orders no se encontrara en el firebase cuando se haga la busqueda, por lo que, cuando hagamos el "agregar documento" se buscara si existe y so no, entonces simplemente se creara "orders".
      addDoc(ordersCollection, order) //Esto se lee como: A ordersCollection, el cual representa el firebase, se le añade la info contenida en el objeto "order".    
      .then((res) => {
        setOrderId(res.id) //Si yo hago un console.log a esta promesa, obtendre un objeto con diferentes parametros, y uno de esos sera el id. Por lo cual, podemos acceder a el unicamente colocando res.id. Despues, con el setOrderId, lo guardamos. Haremos esto para mandar el id y que el usuario pueda verlo en pantalla.
      })
      .catch((err) => console.log(err));

      //El updateDoc primero necesita la referencia a un documento, y despues necesita el nuevo objeto con el que yo quiero actualizar. 
      //El metodo doc necesita la referencia de la base de datos, despues una referencia a una coleccion, despues lo que se quiere actualizar (en este caso el id).
      cart.map((evento) => {
        updateDoc( doc(db, "products", evento.id), {stock: evento.stock - evento.quantity} ); 
      });

      clearCart(); //Depues de finalizar la compra, tenemos que limpiar el carrito.
    },

    validateOnChange: false,
    validationSchema: Yup.object({
      name:  Yup.string().required("Este campo es obligatorio").min(3, "Este campo debe contener"),
      email: Yup.string().email("Este campo no corresponde a un email valido").required(),
      phone: Yup.string().required("Este campo es obligatorio").min(10, "El numero no es adecuado")
    }),
    
  }); //Del lado de las llaves, van las cosas que use useFormik devuelva, mientras que del lado derecho, pasamos dentro de los parentesis la configuracion de todo lo que el necesita.
    
    // console.log(errors)

    return (
      <div>
        {
          orderId ? (<h1>Su compra fue exitosa, el numero de comprovante es: {orderId}</h1>) : (<Checkout handleSubmit={handleSubmit} handleChange={handleChange} errors={errors}/>)
        }
      </div>
    )
}

export default CheckoutContainer