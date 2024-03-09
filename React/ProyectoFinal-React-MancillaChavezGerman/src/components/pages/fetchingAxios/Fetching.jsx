import { useEffect, useState } from "react"
import { productAxios } from "../../../api/axiosInstance";

function Fetching () {
    const [products, setProducts] = useState([]);

    //GET ALL
    useEffect(() => {
        const getData = productAxios.get("");
        getData
        .then((res) => {
            setProducts(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    //GET BY ID
    useEffect(() => {
        const getProduct = productAxios.get("/1");
        getProduct
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    //CREATE
    function createProduct(){

        let data = {
            "title": "Mizuno",
            "price": 15000,
            "stock": 2,
            "description": "Estas son las mejores zapatillas",
            "category": "deportivas",
            "img": "https://res.cloudinary.com/dnqfh2chg/image/upload/v1669326932/free-metcon-4-zapatillas-de-entrenamiento-TQMCZg_fvia3m.png"
        }
        const promiseCreate = productAxios.post("", data);
        promiseCreate
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // PUT
    function camiarTodoElProducto(){
        let data = {
            "title": "Modificadas",
            "price": 2022,
            "stock": 7,
            "description": "Semi nuevos",
            "category": "Formales",
            "img": "https://res.cloudinary.com/dnqfh2chg/image/upload/v1669430010/foc364fsakkzmausrovn.jpg"
        }
        productAxios.put("/5", data);
    }

    // PATCH
    function camiarParteDelProducto(){
        let data = {
            "price": 1998
        }
        productAxios.patch("/5", data);
    }

    // DELETE
    function eliminarProducto(){
        productAxios.delete("/5");
    }

    return (
        <div>
            {
                products.map((product) => {
                    return <h1 key={product.num}>{product.title}</h1>
                })
            }
            <button onClick={createProduct}>Crear producto</button>
            <button onClick={camiarTodoElProducto}>Cambiar con PUT</button>
            <button onClick={camiarParteDelProducto}>Cambiar con PATCH</button>
            <button onClick={eliminarProducto}>Eliminar producto</button>
        </div>
    );
}

export default Fetching


/*//Metodo 1 para hacer fetching
import { useEffect, useState } from "react"
import axios from "axios";

function Fetching () {
    const [products, setProducts] = useState([]);
    const url = "http://localhost:5000/products"

    //GET ALL
    useEffect(() => {
        const getData = axios.get(url);
        getData
        .then((res) => {
            setProducts(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    //GET BY ID
    useEffect(() => {
        const getProduct = axios.get(url+"/1");
        getProduct
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    //CREATE
    function createProduct(){

        let data = {
            "title": "Mizuno",
            "price": 15000,
            "stock": 2,
            "description": "Estas son las mejores zapatillas",
            "category": "deportivas",
            "img": "https://res.cloudinary.com/dnqfh2chg/image/upload/v1669326932/free-metcon-4-zapatillas-de-entrenamiento-TQMCZg_fvia3m.png"
        }
        const promiseCreate = axios.post(url, data);
        promiseCreate
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // PUT
    function camiarTodoElProducto(){
        let data = {
            "title": "Modificadas",
            "price": 666,
            "stock": 7,
            "description": "Semi nuevos",
            "category": "Formales",
            "img": "https://res.cloudinary.com/dnqfh2chg/image/upload/v1669430010/foc364fsakkzmausrovn.jpg"
        }
        axios.put(url+"/5", data);
    }

    // PATCH
    function camiarParteDelProducto(){
        let data = {
            "price": 2002
        }
        axios.patch(url+"/5", data);
    }

    // DELETE
    function eliminarProducto(){
        axios.delete(url+"/5");
    }

    return (
        <div>
            {
                products.map((product) => {
                    return <h1 key={product.id}>{product.title}</h1>
                })
            }
            <button onClick={createProduct}>Crear producto</button>
            <button onClick={camiarTodoElProducto}>Cambiar con PUT</button>
            <button onClick={camiarParteDelProducto}>Cambiar con PATCH</button>
            <button onClick={eliminarProducto}>Eliminar producto</button>
        </div>
    );
}

export default Fetching */