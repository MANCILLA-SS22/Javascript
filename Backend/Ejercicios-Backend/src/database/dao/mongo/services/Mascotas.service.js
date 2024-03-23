import {mascotaModel} from "../models/mascota.model.js"

class MascotaServiceMongo {
    get(params){
        return mascotaModel.find(params)
    }

    getBy(params){
        return mascotaModel.findOne(params);
    }

    save(doc){
        return mascotaModel.create(doc);
    }

    update(id, doc){
        return mascotaModel.findByIdAndUpdate(id, {$set:doc})
    }

    delete(id){
        return mascotaModel.findByIdAndDelete(id);
    }
};

export {MascotaServiceMongo}