import {studentsModel} from "./models/students.model.js";

class StudentServiceMongo {
    constructor() {
        // console.log("Working students with Database persistence in mongodb");
    }

    async getAll (){
        let students = await studentsModel.find();
        return students.map(student => student.toObject());
    }
    async save (student){
        let result = await studentsModel.create(student);
        return result;
    }

    async findByUsername (username){
        const result = await studentsModel.findOne({ email: username });
        return result;
    };

    async update (filter, value){
        console.log("Update student with filter and value:");
        let result = await studentsModel.updateOne(filter, value);
        return result;
    }
}

export {StudentServiceMongo};