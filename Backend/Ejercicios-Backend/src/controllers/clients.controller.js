import {generateUser} from '../utils.js'

async function getClients(req, res){
    try {
        let clients = [];
        for (let i = 0; i < 100; i++) {
            clients.push(generateUser());
        }
        res.send({status: "success", payload: clients});
    } catch (error) {
        console.error(error);
        res.status(500).send({error:  error, message: "No se pudo obtener los usuarios:"});
    }
};

export {getClients}