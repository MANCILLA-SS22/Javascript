import { userModel } from "./models/users.model.js";

class UserService {
    constructor(){
        // console.log("Calling users model using a service.");
    };  
    
    async getAll(){
        let users = await userModel.find();
        return users.map(user=>user.toObject());
    };

    async save(user){
        let result = await userModel.create(user);
        return result;
    };

    async findByUsername(username){
        const result = await userModel.findOne({email: username});
        return result;
    };
    async update(filter, value){
        console.log("Update user with filter: ", filter, "and value: ", value);
        let result = await userModel.updateOne(filter, value);
        return result;
    }
};

export {UserService};