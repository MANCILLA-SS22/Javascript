
# Desafio 11 (Loggers)

A brief description of what this project does and who it's for

- Primero, definir un sistema de niveles que tenga la siguiente prioridad (de menor a mayor): debug, http, info, warning, error, fatal
- Después implementar un logger para desarrollo y un logger para producción, el logger de desarrollo deberá loggear a partir del nivel debug, sólo en consola 
- Sin embargo, el logger del entorno productivo debería loggear sólo a partir de nivel info.
- Además, el logger deberá enviar en un transporte de archivos a partir del nivel de error en un nombre “errors.log”
- Agregar logs de valor alto en los puntos importantes de tu servidor (errores, advertencias, etc) y modificar los console.log() habituales que tenemos para que muestren todo a partir de winston.
- Crear un endpoint /loggerTest que permita probar todos los logs
## Descripcion

La carpeta "logger" contiene el archivo logger_CUSTOM.js, en el se encuentra lo referente a los 4 primeros puntos. Y dependiendo el entorno en donde trabajemos, ya sea "dev" o "prod", obtendremos difererentes resultados. La funcion a exportar desde este archivo es "addLogger", la cual se ejecutara como un middleware en el archivo "classMain.routes.js" de la carpeta "router". 

Algunos links para evaluar en postman y obtener los resultados ya sea en consola o en un archivo (File) son los siguientes: 

- http://localhost:5500/loggerTest/debug
- http://localhost:5500/api/products/65d30aefc1ff61915111349ced

El primer link representa el ultimo punto de la consigna. El segundo link contiene un _id que no existe, por lo que al ejecutarlo obtendremos un mensaje de error en el archivo "errors-dev.log" o "errors-prod.log". (Dependiendo si levantamos el servidor en modo produccion o desarrollador).