import { personModel } from "../database/dao/mongo/models/person.model.js";
import { courseModel } from "../database/dao/mongo/models/matricula.model.js";
import { alumnoModel } from "../database/dao/mongo/models/alumno.model.js";

async function indexation1(){
    // const result1 = await personModel.find({ first_name: "Celia" }).explain("executionStats");
    // const result1 = await personModel.find({ first_name: "Celia" });
    // console.log("Compound indexes", result1); 

    const result2 = await personModel.find({ $text: {$search: "@unesco"} });
    console.log(result2);  

    // const result3 = await personModel.find();
    // console.log(result3);  
}

async function indexation2(){
    // const user = await personModel.find({ first_name: "Fulano "});
    
    //Creamos un nuevo curso y luego comentamos este linea de codigo.
    // await courseModel.create({
    //     title: "Programación Backend",
    //     description: "Curso de Backend",
    //     difficulty: "Intermediate",
    //     professor: "Arturo",
    //     topics: ["Backend", "JavaScript", "Docker"],
    // });

    //Parte 1: Utilizando metodos de busqueda y actualizacion en los indices
    const course = await courseModel.findById("6608c47f689434afdfcd583b"); //Descomentamos esta linea y la siguiente para luego encontrar el curso segun si id. Importante recordar que aqui recivimos un objeto con los parametros establecidos
    course.students.push("65ebe0d2c5207e89a3fc6b67"); //Una vez obtenido el objeto segun su id, ahora debemos agregar, al arreglo "students" que inicialmente esta vacio, el id 6582cc50da03636ef84f3beb. Pero hasta aqui, solo lo hemos agregado al objeto y NO a la base de datos.
    // await courseModel.findByIdAndUpdate( {_id: course._id}, course ); //Finalmente, actualizamos la informacion en la base de datos. 
    const coursePopulate1 = await courseModel.findById("6608c47f689434afdfcd583b").populate("students");
    console.log(JSON.stringify(coursePopulate1, null, 2));

    // Parte 2: Utilizando middlewares
    // const coursePopulate2 = await courseModel.find(); //Con este linea recuperamos toda la informacion perteneciente "students", perteneciente a la base de datos (ver el archivo course.model.js).
    // console.log(JSON.stringify(coursePopulate2, null, 2));
};

async function indexation3(){
    // Encontrar el estudiante por medio del id, despues se le agrega un curso a "student" SOLO en el arreglo, y finalmente actualizamos la BD con el curso agregado a "student"
    // let [student] = await alumnoModel.find({_id: "65ecbd4e6bdc282aef4655ff"});
    // student.courses.push({course: "6608c47f689434afdfcd583b"});
    // await alumnoModel.updateOne({_id: "65ecbd4e6bdc282aef4655ff"}, student);

    const [alumnoPopulate] = await alumnoModel.find({_id: "65ecbd4e6bdc282aef4655ff"}).populate({path: "courses.course", populate: {path: "students", model: "persons"}});

    // const [alumnoPopulate] = await alumnoModel.find({_id: "65ecbd4e6bdc282aef4655ff"}); //Esta linea es en caso de usar middlewares (ver student.model.js)
    console.log(JSON.stringify(alumnoPopulate, null, "\t"));
};

export {indexation1, indexation2, indexation3 };