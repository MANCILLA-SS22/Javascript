import swaggerJsdoc from "swagger-jsdoc"; //Nos permitirá escribir nuestro archivo .yaml o .json, y a partir de ahí generará un apidoc.
import swaggerUIExpress from "swagger-ui-express"; //Nos permitirá linkear una interfaz gráfica que represente la documentación a partir de una ruta de nuestro servidor de express.

function swaggerConfig(app){
    const swaggerOptions = {
        definition: {
            openapi: "3.0.1", //Sirve para especificar las reglas específicas que seguirá la openapi generada.
            info: {
                title: "Documentacion API Ecommerce ", //Título de la API que estamos documentando.
                description: "Documentacion para uso de swagger" //Descripción de la API que estamos documentando.
            }
        },
        apis: [`./docs/**/*.yaml`] //Aquí especificamos la ruta a los archivos que contendrán la documentación. la sintaxis utilizada indica que utilizaremos una carpeta docs, la cual contendrá subcarpetas con cada módulo a documentar
    }
    
    const specs = swaggerJsdoc(swaggerOptions);
    app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs)); // Declaramos la Api donde vamos a tener la parte grafica    
}

export {swaggerConfig};