import { GenericRepository } from "./Generic.repository.js";

class UsuarioRepository extends GenericRepository{
    constructor(dao){
        super(dao);
    }

    getUserByEmail(email){
        return this.getBy({email});
    }
    getUserById(id){
        return this.getBy({_id:id})
    }
};

export {UsuarioRepository}