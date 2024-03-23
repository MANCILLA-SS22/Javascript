import { usuarioModel } from "../models/usuario.model.js";

class UsuarioServiceMongo {
    get(params){
        return usuarioModel.find(params);
    }

    getBy(params){
        return usuarioModel.findOne(params);
    }

    save(doc){
        return usuarioModel.create(doc);
    }

    update(id, doc){
        return usuarioModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete(id){
        return usuarioModel.findByIdAndDelete(id);
    }
};

export {UsuarioServiceMongo}