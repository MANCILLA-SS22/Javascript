import { Schema, model } from "mongoose";

const materiaSchema = new Schema({
    title: String,
    description: String,
    difficulty: Number,
    topics: {
        type: Array, 
        default: []
    },
    professor: String,
    students: {
        type: Array, 
        default: []
    }
});

const materiaModel = model("materias", materiaSchema);
export { materiaModel };