import { Schema, model } from "mongoose";

const estudianteSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    grade: Number,
    group: String
    
});


const estudianteModel = model("estudiantes", estudianteSchema);
export { estudianteModel };