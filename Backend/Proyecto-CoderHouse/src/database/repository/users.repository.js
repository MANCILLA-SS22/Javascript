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
    };

    updatePassword(email, newPassword){
        return this.dao.updatePassword(email, newPassword);
    }

    updateRole(email, newRole){
        return this.dao.updateRole(email, newRole);
    }    

    updateConnection(email, newConnection){
        return this.dao.updateConnection (email, newConnection);
    }    
};

export {UsersRepository}