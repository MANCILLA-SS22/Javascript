import MongoStore from "connect-mongo";
import config from "../config/config.js";

const mongoStoreObj = {
    store: MongoStore.create({
        mongoUrl: config.mongoUrl, 
        // mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 10*60,
    }),
    secret: "coder1234",
    resave: false, //Lo guarda en memoria. Esto permite mantener la sesion activa en caso de que la sesion se mantenga inactiva. Si se deja en false, la sesion morira en caso de que exista cierto tiempo de inactividad.
    saveUninitialized: true // Lo guarda apenas se crea la sesion. Permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada por contener. Si se deja en false, la sesion no se guardara si el objeto de sesion esta vacio al final de la consulta.
};

export {mongoStoreObj}