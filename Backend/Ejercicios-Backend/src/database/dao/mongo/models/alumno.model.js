import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const alumnoSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    courses:{ //La estructura del campo courses indica que cada elemento que se ingrese al arreglo debe tener un campo “course”, el cual será un id que hará referencia a la colección courses.  
        type:[
            {
                course: {
                    type: Schema.Types.ObjectId,
                    ref: "materias" // const materiaModel = model("materias", materiaSchema);    Este “ref” es el que utilizamos para saber que haremos un populate a la colección indicada. 
                }
            }
        ],
        default: [],
    }
});

alumnoSchema.index({first_name: 1, last_name: -1}, { unique: true, dropDups: true })

// alumnoSchema.pre("find", function(){
//     this.populate("courses.course");
// });

alumnoSchema.plugin(mongoosePaginate);
const alumnoModel = model("alumnos", alumnoSchema);

export { alumnoModel };