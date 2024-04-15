//Ejemplo 33: After 4
import express from "express";
import {__dirname} from "./utils.js"
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import mongose from "mongoose";

import viewRouter from "./router/views.routes.js";
import usersRoutes from "./router/user.routes.js";
import postRouter from "./router/post.routes.js";

const app = express();

mongose.connect("mongodb+srv://german_SS22:coder1234@ClusterAfter4.hobtu25.mongodb.net/After4?retryWrites=true&w=majority")
.then(() => console.log("DB connected"))
.catch(err =>{
    console.log("Hubo un error");
    console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("hbs", handlebars.engine({ // Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
        extname: "hbs", //index.hbs
        defaultLayout: "main", //Plantilla principal
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set("views", `${__dirname}/view`); // Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
app.set("view engine", "hbs"); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
app.use(express.static(`${__dirname}/public`)); // Public. Sentamos de manera estatica la carpeta public
app.use("/", viewRouter);
app.use("/api/users", usersRoutes); // Routes
app.use("/api/posts", postRouter); // Routes
app.listen(5500, () => console.log(`Server listening on port ${5500}`));