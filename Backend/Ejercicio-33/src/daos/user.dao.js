import { postModel } from "../models/posts.model.js";
import { userModel } from "../models/users.model.js";

class UserDao {
    async findUsers() {
        return await userModel.find();
    }

    async findById(_id) {
        return await userModel.findById(_id);
    }

    async createUser(user) {
        return await userModel.create(user);
    }

    async updateUser(_id, user) {
        return await userModel.findByIdAndUpdate({ _id }, user);
    }

    async deleteUser(_id) {
        await postModel.deleteMany({ author: _id });
        return await userModel.findByIdAndDelete({ _id });
    }
}

export default new UserDao(); //Agregamos "new" para tener que estar creando instancias en los otros archivos cada vez que importemos los archivos dao