import { userModel } from "../models/user.model.js";

class UserServiceMongo{
    async createUser(parameter){
        try {
            return await userModel.create(parameter);
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllUsers(){
        try {
            return await userModel.find({}).select('_id first_name last_name email role last_connection' );
        } catch (error) {
            throw new Error(error)
        }
    }

    async findUser(parameter){
        try {
            return await userModel.findOne(parameter);
        } catch (error) {
            throw new Error(error)
        }
    }

    async findById(id){
        try {
            return await userModel.findById(id);
        } catch (error) {
            return error
        }
    }

    async updateUser (_id, user){
        try {
            return await userModel.findByIdAndUpdate(_id, user);
        }catch (error) {
            return error;
        }
    };

    async updatePassword(email, newPassword){
        try {
            return await userModel.findOneAndUpdate({email: email}, {password: newPassword})
        } catch (error) {
            return error;
        }
    }

    async updateRole(email, newRole){
        try {
            return await userModel.findOneAndUpdate({ email }, { role: newRole });
        } catch (error) {
            return error;
        }
    }    

    async updateConnection(email, newConnection){
        try {
            return await userModel.findOneAndUpdate({email}, {last_connection: newConnection});
        } catch (error) {
            return error;
        }
    }

    async deleteUsers(id){
        try {
            return await userModel.findByIdAndDelete(id)
        } catch (error) {
            return error;
        }
    }
}

export {UserServiceMongo};