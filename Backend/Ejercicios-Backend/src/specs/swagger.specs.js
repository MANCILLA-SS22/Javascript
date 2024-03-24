import swaggerJsdoc from "swagger-jsdoc"; //Nos permitirá escribir nuestro archivo .yaml o .json, y a partir de ahí generará un apidoc 

const swaggerOptions = {
    definition: {
        openapi: "3.0.1", //Sirve para especificar las reglas específicas que seguirá la openapi generada.
        info: {
            title: "Documentacion API Adopme", //Título de la API que estamos documentando.
            description: "Documentacion para uso de swagger" //Descripción de la API que estamos documentando.
        }
    },
    apis: [`./src/docs/**/*.yaml`] //Aquí especificamos la ruta a los archivos que contendrán la documentación. la sintaxis utilizada indica que utilizaremos una carpeta docs, la cual contendrá subcarpetas con cada módulo a documentar
}

const specs = swaggerJsdoc(swaggerOptions);

export {specs}