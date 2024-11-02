/* Esto se usa cuando el cliente quiera agregar pueda agregar informacion de forma mas facil sin necesidad de usar logica. Simplemente con ayuda dee imputs y unos clocks, que 
se pueda llenar la informacion del firebase (o del lugar que sea), ya que no todos tienen los conocimientos necesarios para poder actualizar la info */
import { addDoc, collection } from "firebase/firestore"
import { db } from "./firebaseConfig"
import {products} from "./productsMock"

const AgregarDocs = () => {

    function rellenar(){
        let itemsCollections = collection(db, "products")

        products.forEach((elemento)=>{
            addDoc( itemsCollections, elemento )
        })
    }

    return (
        <div>
            <button onClick={rellenar}>Rellenar mi coleccion de productos</button>
        </div>
    )
}

export default AgregarDocs

//react router dom
//redux
//pasarela de pago