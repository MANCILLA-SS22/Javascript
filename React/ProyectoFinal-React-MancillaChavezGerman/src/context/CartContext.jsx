import { createContext, useState } from "react";

export const CartContext = createContext(); // Creamos el contexto

/*  A este componente le llegan las props (children) que hacen referencia alos hijos del contexto. Ahora, el proveedor del contexto, a los hijos que pertenecen al CartContextProvider, les tiene que dar acceso en el punto donde esta el return.*/
function CartContextProvider( {children} ){ // Creamos el componente provedor del contexto  
    
    const [cart, setCart] = useState( JSON.parse(localStorage.getItem("cart")) || [] ); //console.log(cart);

    function addToCart( newProduct ){// newProduct es el objeto del elemento que se agrego al carrito, es decir, uno de los 4 tenis existentes
        //console.log(newProduct);
        let exist = isInCart(newProduct.id); // Preguntamos si existe o si ya esta almacenado en el carrito.
        if (exist) {
            let newArray = cart.map((product) => {  //Este map devuelve un arreglo un nuevo arreglo con la misma longitud. En cart, se encuentran los objetos de los productos agregados al carrito, por lo que, con el map, hacemos la iteracion para verificar los id contenidos en cada objeto y compararlos con el objeto recien agregado.
                if (product.id === newProduct.id) { //product.id representa el id actual, mintras que newProduct.id representa el id del nuevo producto.
                    return {                        //Si el id del producto que se esta iterando, es igual al id del producto nuevo que se quiere agregar, entonces retornamos un nuevo objeto, con todo lo que tenia el producto, y mas aparte, la cantidad del producto pero actualizada.
                        ...product,
                        quantity: product.quantity/*  + newProduct.quantity */
                    }
                }else{
                    return product;                 //Sino, entonces retorna el mismo producto que se tenia al principio (esto porque map si o si, debe retornar algo)
                }
            })
            setCart(newArray); //Dependiendo de si entro al if o al else, con el setCart(newArray), mandamos ese nuevo array al useState y de esa manera tenemos un nuevo arreglo
            localStorage.setItem("cart", JSON.stringify([newArray]))
        
        }else{                              //Si no existe, dejamos todo lo que tenia el carrito (sin modificarlo) y le agregamos el nuevo producto
            setCart([...cart, newProduct]); //...cart se lee como: Primero mantengo todo lo que tiene mi arreglo, y despues le damos el nuevo producto (seteamos) para no perder los objetos anteriores.
            localStorage.setItem("cart", JSON.stringify([...cart, newProduct]))
        }
    }

    function isInCart(id){
        let exist = cart.some( (evento) => { //Comparamos si el id del elemento que se agrego anteriormente, es el mismo que el id que se acaba de agregar
            return evento.id === id; //Retornamos true o false a la funcion addToCart
        })
        return exist
    }

    function clearCart(){
        setCart( [] );
        localStorage.removeItem("cart")
    }

    function removeById(id){
        let newArray = cart.filter((evento) => { //El filter retorna un nuevo array con todos los elementos que cumplan una condicion dada.
            return evento.id !== id; //Cuando queremos eliminar un elemento del carrito, verificamos su id primero. En esta linea, se dice que, todos los elementos que tengan un id distinto al elemento que se quiere eliminar, se van a filtrar y se mostrara un nuevo array.
        });
        setCart(newArray); //Con el setCart, seteamos (actualizamos) ese arreglo.
        localStorage.setItem("cart", JSON.stringify(newArray));
    }

    function getTotalQuantityById(id){
        let producto = cart.find((evento) => { //Usamos el find para poder identificar el elemento con base en el id. Este retorna unicamente un objeto.
            return evento.id === id; //Si tuvieramos que obtener un numero, entonces quedaria como: return evento.id === Number(id);  Esto porque ahora con firebase, estariamos obeniento un id pero con formato STRING. Si estuvieramos con el productsMok, ahi si quedaria como un numero.
        })
        return producto?.quantity; //Se utiliza el optional changing (?.) porque, no podemos pedir algo undefined, o de lo contrario tendremos un error. Entonces, lo que hace este operador, es que verifica si existe una cantidad. Si la hay, entonces retorna ese valor, pero si es undefined, simplemente retorna undefined, pero "producto" NO solicita ese undefined.
    }

    function getTotalItems(){
        let total = cart.reduce((acc, ele) => {
            return acc + ele.quantity;
        }, 0)
        return total;
    }

    function getTotalPrice(){
        let total = cart.reduce((acc, ele) => {
            return acc + (ele.quantity * (ele.priceNow))
        },0);
        return total;
    }

    //Si queremos consumir cart en otro lado, todo lo que queramos consumir en los hijos, lo debemos poner en data, lo cual se pasara como tipo value en el return.
    let data = {
        cart: cart,
        addToCart: addToCart,
        clearCart: clearCart,
        removeById:removeById,
        getTotalQuantityById:getTotalQuantityById,
        getTotalItems:getTotalItems,
        getTotalPrice:getTotalPrice
    };

    // Tod0s los elementos contenidos en el proveedor de contexto los necesitamos pasar como valor en el CartContext.Provider
    return <CartContext.Provider value={ data }> {children} </CartContext.Provider>; //Este componente retorna el contexto en su metodo provedor
    
}

export default CartContextProvider;

/* 
1. Creamos el contexto 
2. Creamos el componente provedor del contexto 
3. Retornamos el contexto en su metodo provedor 
4. Recibimos los childrens. 
5. Le damos acceso a los childrens. 
6. Cuando querramos consumir ese contexto en otra parte, debemos usar import { useContext } from "react";
*/