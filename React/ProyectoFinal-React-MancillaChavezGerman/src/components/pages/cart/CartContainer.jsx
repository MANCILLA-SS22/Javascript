import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import Swal from "sweetalert2";
import Cart from "./Cart";

function CartContainer() {
  
  //Esto hook devuelve un objeto, y ese objeto es el objeto data que estabamos pasando en el value de CartContext.jsx, y despues eso lo podemos desestructurar.
  const {cart, clearCart, removeById, getTotalPrice} = useContext(CartContext);

  let total = getTotalPrice();

  function limpiar(){
    Swal.fire({
      title: 'Seguro quieres limpiar el carrito?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si, limpiar',
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire('Carrito vacio', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se ha borrado nada', '', 'info')
      }
    })
  }


  return (
    <div>
      <Cart
        total={total}
        limpiar={limpiar}
        cart={cart}
        removeById={removeById}
      />
    </div>
  )
}

export default CartContainer

/* import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import Swal from "sweetalert2";

function CartContainer() {
  
  //Esto hook devuelve un objeto, y ese objeto es el objeto data que estabamos pasando en el value de CartContext.jsx, y despues eso lo podemos desestructurar.
  const {cart, clearCart, removeById, getTotalPrice} = useContext(CartContext);

  let total = getTotalPrice();

  function limpiar(){
    Swal.fire({
      title: 'Seguro quieres limpiar el carrito?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si, limpiar',
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire('Carrito vacio', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se ha borrado nada', '', 'info')
      }
    })
  }


  return (
    <div>
      <h2>El total es: {total}</h2>
      {
        cart.length > 0 && (<button onClick={limpiar}>Limpiar carrito</button>)
      }

      {
        cart.map((evento) => {
          return (
            <div key={evento.id}>
              <h2>{evento.title}</h2>
              <h3>{evento.price}</h3>
              <h3>{evento.quantity}</h3>
              <button onClick={ () => removeById(evento.id) }>Eliminar</button>
            </div>
          );
        })
      }

    </div>
  )
}

export default CartContainer */

/* import { useNavigate } from "react-router-dom"

function CartContainer() {

  const navigate = useNavigate()

  function realizarCompra() {
    console.log("se compraron los productos")
    navigate("/") //navigate() se usa cuando estamos en un JS. En cambio, <link></link> se usa para el html
  }

  return (
    <div>
        <h1>Carritoooo</h1>
        <button onClick={realizarCompra}>Comprar</button>
    </div>
  )
}

export default CartContainer */