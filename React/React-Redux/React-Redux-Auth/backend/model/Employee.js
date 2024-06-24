import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
});

const employeeModel = model('Employee', employeeSchema);

export default employeeModel;