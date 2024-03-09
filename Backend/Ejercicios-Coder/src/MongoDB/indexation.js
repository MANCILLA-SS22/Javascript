import { personModel } from "../services/dao/mongo/models/person.model.js";
import { courseModel } from "../services/dao/mongo/models/matricula.model.js";
import { alumnoModel } from "../services/dao/mongo/models/alumno.model.js";
import { materiaModel } from "../services/dao/mongo/models/materia.model.js";

async function indexation1(){
    const result1 = await personModel.find({ first_name: "Celia" }).explain("executionStats"); 
    console.log("Compound indexes", result1); 

    const result2 = await personModel.find({ $text: {$search: "@unesco"} });
    console.log(result2);  

    const result3 = await personModel.find();
    console.log(result3);  
}

async function indexation2(){
    // const user = await personModel.find({ first_name: "Fulano "});
    
    //Creamos un nuevo curso y luego comentamos este linea de codigo.
    await courseModel.create({
        title: "Programación Backend",
        description: "Curso de Backend",
        difficulty: "Intermediate",
        professor: "Arturo",
        topics: ["Backend", "JavaScript", "Docker"],
    });

    //Parte 1: Utilizando metodos de busqueda y actualizacion en los indices
    const course = await courseModel.findById("659a64eed08fb8d59ebce94e"); //Descomentamos esta linea y la siguiente para luego encontrar el curso segun si id. Importante recordar que aqui recivimos un objeto con los parametros establecidos
    course.students.push("6582cc50da03636ef84f3beb"); //Una vez obtenido el objeto segun su id, ahora debemos agregar, al arreglo "students" que inicialmente esta vacio, el id 6582cc50da03636ef84f3beb. Pero hasta aqui, solo lo hemos agregado al objeto y NO a la base de datos.
    const result = await courseModel.findByIdAndUpdate( {_id: course._id}, course ); //Finalmente, actualizamos la informacion en la base de datos. 
    console.log("Result ", result); console.log("Course ", course);

    //Parte 2: Incorporacion de population
    // const course = await courseModel.findById("659a64eed08fb8d59ebce94e");
    // console.log(JSON.stringify(course, null, 2)); 
    // const coursePopulate1 = await courseModel.findById("659a64eed08fb8d59ebce94e").populate("students");
    // console.log(JSON.stringify(coursePopulate1, null, 2));

    //Parte 3: Utilizando middlewares
    // const coursePopulate2 = await courseModel.find(); //Con este linea recuperamos toda la informacion perteneciente "students", perteneciente a la base de datos (ver el archivo course.model.js).
    // console.log(JSON.stringify(coursePopulate2, null, 2));
};

async function indexation3(){
    await mongoose.connect(url);      
    
    // Paso 1: Crear los 2 colecciones, uno para "students" y el otro para "courses".
    await alumnoModel.create({
        first_name: "Hilda",
        last_name: "Carina",
        email: "hilda@gmail.com",
        gender: "Female",
    });

    await materiaModel.create({
        title: "Curso de backend",
        description: "Es un curso de programacion para desarrollar servidores",
        difficulty: 5,
        topics: ["Javascript", "Servidores", "Frameworks", "Middlewares", "Base de datos"],
        professor: "German"
    });

    // Paso 2: Encontrar el estudiante por medio del id, despues se le agrega un curso a "student" SOLO en el arreglo, y finalmente actualizamos la BD con el curso agregado a "student"
    // let [student] = await alumnoModel.find({_id: "659a5e5ea881e3ba3dea5a55"});
    // student.courses.push({course: "659a5e5fa881e3ba3dea5a57"});
    // let result = await alumnoModel.updateOne({_id: "659a5e5ea881e3ba3dea5a55"}, student);
    // console.log(JSON.stringify(student, null, "\t"));

    //Uso del population
    // let [student] = await alumnoModel.find({_id: "659a5e5ea881e3ba3dea5a55"}).populate("courses.course");
    // let [student] = await studenModel.find({_id: "659a5e5ea881e3ba3dea5a55"}); //Esta linea es en caso de usar middlewares (ver student.model.js)
    // console.log(JSON.stringify(student, null, "\t"));
};

export {indexation1, indexation2, indexation3 };