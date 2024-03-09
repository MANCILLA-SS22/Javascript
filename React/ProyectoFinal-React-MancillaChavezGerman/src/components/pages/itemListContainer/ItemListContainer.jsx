//Codigo utilziando Firebase y modificando el useEffect()
import ItemList from "./ItemList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { db } from "../../../firebaseConfig";  
import {collection, getDocs, query, where } from "firebase/firestore"
// import AgregarDocs from "../../../AgregarDocs";

function ItemListContainer(){

    /* const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    }; */

    const [items, setItems] = useState([]); //console.log(items);
    const {categoryName} = useParams(); //console.log(categoryName);
    
    /* //Metodo 1 para el useEffect() SIN usar la refactorizacion (o simplificacion del codigo)
    useEffect(() => {
        if (!categoryName) {
            let itemsCollection = collection(db, "products"); //guardamos la referencia de la coleccion a la que se desea acceder. Del lado izquierdo le pasamos la bd, y del lado derecho la coleccion (en formato string).
            getDocs(itemsCollection)                          //Solo necesita la referencia a la coleccion de donde quiero sacar los documentos
            .then((res) => {                                  //.docs[] se utiliza en este caso para acceder a la informacion de los elementos, la cual esta definida como un arreglo. Con .data(), transformamos la informacion compleja mostrada, en algo sencillo de leer (cabe mencionar que el id NO aparece, pero SI el resto de la info). Es decir, la informacion de los zapatos en este caso. Si deseamos acceder al id, tenemos que poner .id al final. Pero el problema surge porque necesitamos el id y el resto de la info en un solo array, y no por separado.
                let productos = res.docs.map((evento) => {    //Con el map estaremos obteniendo un nuevo array, en el cual tendremos incorporado el id y el resto de la informacion de cada elemento, y no por separado como en un inicio.
                    return {                                  //En cada vuelta retornamos un nuevo objeto, en donde tendremos ahora si, el id y el resto de la info en forma de objeto, y contenida en el nuevo array.
                        ...evento.data(),                     //Recordar que .data() se utiliza para tranformar la informacion rara mostrada en las dev tools, en algo legible para nosotros.
                        id: evento.id                         //Con el operador spread (...) utilizado arriba, podemos añadir el id al objeto y tener todo junto.
                    }
                });
                setItems(productos);                          //Una vez teniendo el arreglo, lo seteamos para poder mostrarlo en el inicio. 
            })
            .catch((err) => console.log(err));
        }else{
            let itemsCollection = collection(db, "products");
            let QUERY = query(itemsCollection, where("category", "==" , categoryName)); //Hacemos una query (consulta) de los elementos de la base de datos (almaceados en itemsCollection). Despues, dentro del where() se realiza el filtrado. En este, se colocan 3 parametros, el primero tiene que coincidir con alguna propiedad del documento, el segundo, es para colocar el operador matematico, y el tercero es para verificar si este coincide con el primero.
            getDocs(QUERY)
            .then((res) => {                                  
                let productos = res.docs.map((evento) => {
                    return {
                        ...evento.data(),
                        id: evento.id
                    }
                });
                setItems(productos);
            })
            .catch((err) => console.log(err));
        }

    }, [categoryName]);  */

    // Metodo 2 para el useEffect() utilizando la refactorizacion (para simplificar el codigo)
    useEffect(() => {
        let itemsCollection = collection(db, "products");
        let consulta;

        if (!categoryName) {
            consulta = itemsCollection;
        }else{
            consulta = query(itemsCollection, where("category", "==" , categoryName));
        }

        getDocs(consulta)
            .then((res) => {                                  
                let productos = res.docs.map((evento) => {
                    return {
                        ...evento.data(),
                        id: evento.id
                    }
                });
                setItems(productos);
            })
            .catch((err) => console.log(err));
    }, [categoryName]);

    //condicional con return termprano
    if (items.length === 0) {
        return (
        <div style={{width: "100%",height: "90vh",display: "flex",justifyContent: "center",alignItems: "center"}}>
            <ScaleLoader color="steelblue" width={40} height={111}  />
        </div>
        )
    }

    return(
        <div>
            {/* <AgregarDocs/> */}
            {
                items.length > 0 ? <ItemList Items={items}/> : (<ScaleLoader color="steelblue" width={40} height={111}/>)
            }
        </div>
    )

}

export default ItemListContainer


/* //Codigo sin utilizar Firebase y solamente trabajar con el productsMock
import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { products } from "../../../productsMock";
import { useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

function ItemListContainer(){

    // const override = {
    //     display: "block",
    //     margin: "0 auto",
    //     borderColor: "red",
    // };

    const [items, setItems] = useState([]); //console.log(items);
    const {categoryName} = useParams(); //console.log(categoryName);
    
    useEffect(() => {
        let productosFiltrados = products.filter( (producto) => {
            return producto.category === categoryName;
        }); //console.log(productosFiltrados);

        const tarea = new Promise((resolve) => {
            setTimeout(() => {
                resolve(categoryName ? productosFiltrados : products);
            }, 500);
        });

        // // Metodo 1: .then() y .catch()
        // tarea
        //     .then((res) => {setItems(res)})
        //     .catch((err) => {setItems(err)})

        // Metodo 2: async-await
        async function getData(){
            try {
                let res = await tarea;
                setFrase(res);
            }catch (err) {
                console.log(err);
            }
        }
        getData()

    }, [categoryName]); 

    //condicional con return termprano
    if (items.length === 0) {
        return (
        <div style={{width: "100%",height: "90vh",display: "flex",justifyContent: "center",alignItems: "center"}}>
            <ScaleLoader color="steelblue" width={40} height={111}  />
            // {<h1>Espere por favor...</h1>}
        </div>
        )
    }

    //Return de sin usar spinner
    return <ItemList Items={items}/>;

    // return(
    //     <div>
    //         {
    //             items.length > 0 ? <ItemList Items={items}/> : (<ClipLoader cssOverride={override} color="#36d7b7" />)
    //         }
    //     </div>
    // )

    
}

export default ItemListContainer */










/* import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { products } from "../../../productsMock";

function ItemListContainer(){

    const [items, setItems] = useState([]); //console.log(items);

    useEffect(() => {
        const tarea = new Promise((resolve) => {
            setTimeout(() => {
                resolve(products);
                
            }, 3000);
        });

        // Metodo 1: .then() y .catch()
        tarea
            .then((res) => {setItems(res)})
            .catch((err) => {setItems(err)})

        // Metodo 2: async-await
        // async function getData(){
        //     try {
        //         let res = await tarea;
        //         setFrase(res);
        //     }catch (err) {
        //         console.log(err);
        //     }
        // }
        // getData()
        
    }, []); 

    return <ItemList Items={items}/>;
}

export default ItemListContainer */

/* function ItemListContainer( {res} ){

    const [contador, setContador] = useState(0); console.log("El componente se actualiza")

    useEffect( ()=> {
        console.log("Se hace la peticion a la API");
    }, []) 

    useEffect( ()=> {
        console.log("Me ejecuto de forma condicional");
    }, [contador, res])

    return <ItemList conta={contador} setConta={setContador} />
}

export default ItemListContainer */