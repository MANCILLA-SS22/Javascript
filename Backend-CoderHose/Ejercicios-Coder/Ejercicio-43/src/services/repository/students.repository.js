class StudentsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getAll(){
        return this.dao.getAll();
    }

    save(student){
        return this.dao.save(student);
    }

    findByUsername (username){
        return this.dao.findByUsername(username);
    };

    update(id, student){
        return this.dao.update(id, student);
    }    
};

export {StudentsRepository}