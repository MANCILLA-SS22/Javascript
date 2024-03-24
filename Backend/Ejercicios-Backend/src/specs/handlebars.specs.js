import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Handlebars from "handlebars";

const stencil = { // Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
    extname: "hbs", //index.hbs
    defaultLayout: "main", //Plantilla principal
    handlebars: allowInsecurePrototypeAccess(Handlebars)
};

export {stencil}