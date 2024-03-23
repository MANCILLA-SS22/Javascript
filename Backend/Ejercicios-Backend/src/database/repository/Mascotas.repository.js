import {GenericRepository} from "./Generic.repository.js";

class MascotaRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }
}

export {MascotaRepository}