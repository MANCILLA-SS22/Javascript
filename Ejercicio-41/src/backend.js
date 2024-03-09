/* Ejemplo 40: Cookies, Session & Storage, inicio de sesion y JSW
Utilización de cookies: set, get, clear y firmar una cookie. (Con cookieParser)
✓ Setear una cookie
✓ Obtener una cookie
✓ Eliminar una cookie
✓ Firma de una cookie

Inyectar cookies en frontend: Crear una única vista de frontend en nuestro servidor express, la cual contará con dos campos input y dos botones 
✓ El primer campo input deberá ser el nombre del cliente. 
✓ El segundo campo input deberá contener el correo electrónico 
✓ El botón getCookie debe enviar una petición de tipo GET para recibir la cookie, solo mostrar por consola la cookie. 
✓ El botón submit, deberá enviar una petición POST, la cual deberá crear una cookie con el formato {user:correoDelInput} 
✓ La cookie debe tener un tiempo de vida de 10 segundos. Corroborar que la cookie se borre después del tiempo indicado. 

Sesiones de usuario en el server: Realizar un programa de backend que establezca sesiones de usuarios en el servidor.
✓ Cuando un cliente visita el sitio por primera vez en la ruta 'root', se presentará el mensaje de “Te damos la bienvenida”.
✓ Con los siguientes request de ese mismo usuario, deberá aparecer el número de visitas efectuadas. El cliente podrá ingresar por query params el nombre, en cuyo caso se añadirá a los mensajes devuelto.
✓ Por ejemplo: “Bienvenido Juan” o “Juan visitaste la página 3 veces”. Ese nombre, solo se almacenará la primera vez que el cliente visite el sitio. 

Ejemplo 41: Login por formulario, autenticacion-autorizacion 
Primer login por formulario
✓ Se deberá contar con una estructura de router para sessions en /api/sessions/ el cual contará con métodos para registrar a un usuario y para su respectivo login
✓ Se deberá contar además con un router de vistas en la ruta base / para llevar al formulario de login, de registro y de perfil.
✓ El formulario de registro insertará en la base de datos el usuario. El cual deberá contar con: first_name, last_name, email, age, password
✓ Se debe contar con el formulario de login el cual corroborará que el usuario exista en la base, y además genere un objeto user en req.session, indicando que puede utilizar la página.
✓ Agregar validaciones a las rutas de vistas para que, si aún no estoy logueado, no pueda entrar a ver mi perfil, y si ya estoy logueado, no pueda volver a loguearme o registrarme.
✓ En la vista de perfil, se deben arrojar los datos no sensibles del usuario que se haya logueado.

Reajustando autorización (Continuacion del Primer login por formulario)
✓ Cambiar la validación de rutas por middlewares de rutas públicas o privadas.
    ○ Las rutas públicas deben regresar siempre a la pantalla de login en caso de que no se reconozca una session activa.
    ○ Las rutas privadas deben regresar siempre a la pantalla de profile en caso de que haya una sesión activa en session.
✓ Realizar un botón “logout” en la vista de perfil, que permita destruir la sesión y redireccionar a la vista de login

Restauración de contraseña (Autorizacion y Autenticacion)
✓ Un link desde la vista de login que diga “Restaurar contraseña”, el cual llevará a una nueva vista.
✓ Esta nueva vista de restauración solicitará dos campos: el correo electrónico y la nueva contraseña a cambiar.
✓ NO REQUERIREMOS VERIFICACIÓN DE CORREO, esto lo haremos más adelante, solo indicaremos el correo y se deberá sustituir el password.
✓ El nuevo password deberá estar Hasheado también.
✓ Reintentar el login y corroborar que el usuario se pueda loguear correctamente.

Ejemplo 42: Uso de passport y jwt (con sessions)
Inicio de sesión con jwt --> A partir del servidor de express que estamos construyendo:
✓ Configurar la creación del token para que ésta solo tenga duración de 1 minuto.
✓ Crear tres vistas, vista base, vista de registro y vista de login. (puedes hacerlo sin motor de plantillas).
✓ Al cargar la página principal (‘/’), si existe una sesión iniciada, se mostrarán los datos del usuario en cuestión (obtenidos mediante una consulta con el token debidamente adjunto en el encabezado de la petición de datos). Caso contrario, se deberá cargar automáticamente la pantalla de login.
✓ Corroborar el envío del token al front para su futuro almacenamiento */
import express from "express";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Filestore from "filestore";
import morgan from "morgan";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import cookieParser from 'cookie-parser';

import { initialPassport } from "./config/passport.config.js";
import {__dirname} from "./utils.js"
import viewRouter from "./router/cookies.routes.js";
import usersViewRouter from "./router/users.views.routes.js";
import sessionsRouter from "./router/sessions.routes.js";
import githubLoginViewRouter from "./router/github-login.views.routes.js";

const app = express();
const MONGO_URL = "mongodb+srv://xxeltiradorxx:coder1234@cluster0.hkcpkdd.mongodb.net/login?retryWrites=true&w=majority";
const filestore = Filestore(session);
const stencil = { // Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
    extname: "hbs", //index.hbs
    defaultLayout: "main", //Plantilla principal
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}
const mongoSession = { 
    // store: new filestore({path: "./sessions", ttl: 15, retries: 0}), //Al usar esto, creamos una sesion en el file system. Si queremos agregarle atributos a esta sesion, debemos usar req.session 
    store: MongoStore.create({                                          //Al usar esto, creamos una sesion en la base de datos. Si queremos agregarle atributos a esta sesion, debemos usar req.session 
        mongoUrl: MONGO_URL, 
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 10*60,
    }),
    secret: "coder1234",
    resave: false, //Lo guarda en memoria. Esto permite mantener la sesion activa en caso de que la sesion se mantenga inactiva. Si se deja en false, la sesion morira en caso de que exista cierto tiempo de inactividad.
    saveUninitialized: true // Lo guarda apenas se crea la sesion. Permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada por contener. Si se deja en false, la sesion no se guardara si el objeto de sesion esta vacio al final de la consulta.
}

async function connectMongo(){
    try {
        console.log("DB connected")
        await mongoose.connect(MONGO_URL)
    } catch (error) {
        console.log(err);
        process.exit();
    }
}
connectMongo();
initialPassport();

app.use(morgan('dev'));
app.use(session(mongoSession));
app.use(cookieParser("CoderS3cr3tC0d3"));
app.set("views", `${__dirname}/views`);
app.engine("hbs", handlebars.engine(stencil));
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", viewRouter);
app.use('/users', usersViewRouter);
app.use("/github", githubLoginViewRouter);
app.use("/api/sessions", sessionsRouter);
app.listen(5500, () => console.log(`Server listening on port ${5500}`));