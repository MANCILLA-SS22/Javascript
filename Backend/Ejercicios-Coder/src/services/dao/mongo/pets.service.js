import { petsModel } from "./models/pet.model.js";

class PetsService {
    constructor(){
        // console.log("Calling pets model using a service.");
    };  

    async getAll(){
        let pets = await petsModel.find();
        return pets.map(pet=>pet.toObject());
    };

    async save(pet){
        return await petsModel.create(pet);
    };

    async findByName(name){
        return await petsModel.findOne({name: name});
    };

    async update(filter, value){
        console.log("Update pet with filter: ", filter, "and value: ", value);
        let result = await petsModel.updateOne(filter, value);
        return result;
    }
};

export {PetsService}