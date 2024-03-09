import { postModel } from "../models/posts.model.js";

class PostDao {
    async findPosts() {
        return await postModel.find();
    }

    async createPost(post) {
        return await postModel.create(post);
    }

    async updatePost(_id, post) {
        return await postModel.findOneAndUpdate({ _id }, post);
    }

    async deletePost(_id) {
        return await postModel.findByIdAndDelete({ _id });
    }
}

export default new PostDao(); //Agregamos "new" para tener que estar creando instancias en los otros archivos cada vez que importemos los archivos dao