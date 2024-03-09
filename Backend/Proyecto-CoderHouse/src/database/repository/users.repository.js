class UsersRepository {
    constructor(dao) {
        this.dao = dao;
    }
    createUser(parameter){
        return this.dao.createUser(parameter);
    }

    findUser(parameter){
        return this.dao.findUser(parameter);
    }

    findById (id){
        return this.dao.findById(id);
    };

    updateUser(_id, user){
        return this.dao.updateUser(_id, user);
    }    
};

export {UsersRepository}