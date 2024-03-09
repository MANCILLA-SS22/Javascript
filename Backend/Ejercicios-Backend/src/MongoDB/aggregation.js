// El equipo de ventas corrobora que hay bajas en el número de peticiones de pizzas medianas y necesita confirmar el monto general que ha habido en las órdenes del tamaño “mediano” (ésto debido a que fue el tamaño protagónico de su última campaña de marketing).
// Ahora toca analizar los sabores y corroborar cuáles están brindando una mayor rentabilidad, y cuáles deberían salir o sustituirse por un nuevo sabor. ¿Qué debería hacer nuestra aggregation?
// ✓ Primero, una stage para filtrar las pizzas por su tamaño, ya que sólo nos interesa la campaña de pizzas medianas.
// ✓ Segundo, agrupar las pizzas por sabor para corroborar cuántos ejemplares se vendieron de dichos sabores.

import orderModel from "../services/dao/mongo/models/order.model.js";
import { meals } from "../../data/arrays.data.js";

import { estudianteModel } from "../services/dao/mongo/models/estudiante.model.js";
// import { studentsData } from "../../data/students.json";

async function aggregation1(){ 
    const result = await orderModel.insertMany(meals);
    console.log(result);

    // // Find
    const orders = await orderModel.find();
    console.log(result);


    // const result = await orderModel.aggregate(
    //     [
    //         {
    //             $match: {size: "medium"} //Buscamos todos los elementos que "coincidan" con el tamano mediano.
    //         },
    //         {
    //             $group: {
    //                 _id: "$name", 
    //                 price: {$first: "$price"},
    //                 totalSells:{$sum: "$quantity"}
    //             }
    //         },
    //         {
    //             $sort: {totalSells: 1} //Ordena los documentos en la stage actual (1 = descendente, -1, ascendente)
    //         },
    //         {
    //             $group: {
    //                 _id: 1, 
    //                 orders: {$push: "$$ROOT"} //Se crea un nuevo campo
    //             }
    //         },
    //         {
    //             $project: {//Cuando queramos usar $merge, primero devemos crear un projecto. $project no devuelve nada, sino que prepara el documento para incertarlo
    //                 _id: 0,//Esto es para que genere un nuevo id pero que no cree un campo
    //                 orders: "$orders"
    //             } 
    //         },
    //         {
    //             $merge: {into: "reports"} // $merge  siempre debe colocarse hasta el final
    //         }
    //     ]
    // );

    console.log(result);

};

async function aggregation2(){ 
    // const result = await estudianteModel.insertMany(studentsData); console.log(result); //Insertamos el JSON de estudiantes en la base de datos de mongodb

    // 1. Obtener a los estudiantes agrupados por calificación del mejor al peor
    const result = await estudianteModel.aggregate([
        {
            $group: { _id: "$grade", students: {$push: "$first_name"} } // Agrupar por nombre y notas
        },
        {
            $sort: { _id: -1 } // Ordenar del mejor al peor
        } 
    ]);
    console.log("1. ", result);
    
    // 2. Obtener a los estudiantes agrupados por grupo.
    const result2 = await estudianteModel.aggregate([
        { 
            $group: { _id: "$group", students: { $push: "$first_name" } } // Agrupados por grupo
        }
    ]);
    console.log("2. ",result2);

    
    // 3. Obtener el promedio de los estudiantes del grupo 1B
    const result3 = await estudianteModel.aggregate([
        { 
            $match: { group: "1B" }
        },
        {
            $group: { _id: "$group", total: { $sum: "$grade" }, totalStudents: { $sum: 1 } } //$sum: "$grade" sirve para sumar la cantudad de calificaciones existentes, mientras que totalStudents: { $sum: 1 } servira para contar pero la cantidad de estudiantes y asi sacar el promedio. Se inicializa en 1 porque ira iterando de 1 en uno cada que se cuente un estudiante al momento de sumar una calificacion.
        },
        { 
            $project: { _id: 1, promedio: { $divide: ["$total", "$totalStudents"] } } //Se utiliza _id: 1 para que al documento se le genere un nuevo id. Se utiliza  _id: 0 para que genere un nuevo id pero que no cree un campo
        } 
    ]);
    console.log("3. ",result3);
    
    // 4. Obtener el promedio de los estudiantes del grupo 1A
    const result4 = await estudianteModel.aggregate([
        { 
            $match: { group: "1A" }
        },
        {
            $group: { _id: "$group", total: { $sum: "$grade" }, totalStudents: { $sum: 1 } } // Agrupamos por grupo y notas (total) y cantidad de alumnos
        },
        {
            $project: { _id: 1, promedio: { $divide: ["$total", "$totalStudents"] } }// Creamos un documento con el promedio
        }
    ]);
    console.log("4. ",result4);
    
    // 5. Obtener el promedio general de los estudiantes.
    const result5 = await estudianteModel.aggregate([
        { 
            $group: { _id: "Total", total: { $sum: "$grade" }, totalStudents: { $sum: 1 } } 
        },
        { 
            $project: { _id: 1, promedio: { $divide: ["$total", "$totalStudents"] } } 
        }
    ])
    console.log("5. ",result5);
    
    // 6. Obtener el promedio de calificación de los hombres
    const result6 = await estudianteModel.aggregate([
        { 
            $match: { gender: "Male" }
        },
        { 
            $group: { _id: "$gender", total: { $sum: "$grade" }, totalStudents: { $sum: 1 } } 
        },
        { 
            $project: { _id: 1, promedio: { $divide: ["$total", "$totalStudents"] } }
        }
    ])
    console.log("6. ",result6);
    
    // 7. Obtener el promedio de calificación de las mujeres.
    const result7 = await estudianteModel.aggregate([
        { 
            $match: { gender: "Female" }
        },
        {
            $group: { _id: "$gender", total: { $sum: "$grade" }, totalStudents: { $sum: 1 } }
        },
        {
            $project: { _id: 1, promedio: { $divide: ["$total", "$totalStudents"] } }
        },
    ]);
    console.log(result7);
}

export {aggregation1, aggregation2}