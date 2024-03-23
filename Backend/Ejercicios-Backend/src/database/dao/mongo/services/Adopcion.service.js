import { adopcionModel } from "../models/adopcion.model.js";

class AdopcionServiceMongo {
    get(params){
        return adopcionModel.find(params);
    }

    getBy(params){
        return adopcionModel.findOne(params);
    }

    save(doc){
        return adopcionModel.create(doc);
    }

    update(id,doc){
        return adopcionModel.findByIdAndUpdate(id,{$set:doc})
    }
    
    delete(id){
        return adopcionModel.findByIdAndDelete(id);
    }
};

export { AdopcionServiceMongo }