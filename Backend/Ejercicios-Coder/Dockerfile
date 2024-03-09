#La imagen base
FROM node

#Carpeta interna de trabajo donde se guarda el proyecto. (Será nuestro directorio de trabajo principal, donde comenzaremos a crear todo. Las operaciones que hagamos más abajo se harán sobre este directorio)
WORKDIR /app

#Se copia el archivo package.json al directorio raiz. (COPY permitirá copiar archivos de la carpeta donde estamos ejecutando el Dockerfile, y pegarlos en la carpeta que hayamos creado con WORKDIR)
COPY package*.json ./

#Ejecutamos el comando npm install para generar las dependencias. (RUN nos permitirá ejecutar comandos. Al usar la imagen base node, significa que el entorno podrá correr comandos de node y npm sin problema.)
RUN npm install

#Procedemos a copiar todo el código del aplicativo.
COPY . .

#El puerto a exponer en nuestro contenedor.
EXPOSE 9090

#Ejecutar el comando para arrancar la app. (CMD al final es la ejecución del comando final que se utilizará al momento de echar a andar el servidor cuando hagamos docker run, y validar que exista el script en el package.json)
CMD [ "npm", "start"]

#Una vez configurado nuestro respectivo dockerfile, podemos poner a prueba éste ejecutando el comando build -->    docker build -t dockeroperations
#El comando build leerá el archivo y comenzará con la construcción de la imagen para nuestro aplicativo. Una vez que tenga la imagen del aplicativo, necesita colocarle un nombre, la flag -t significa “tag” y es para nombrar la imagen.
#El punto "." sirve para indicarle que el dockerfile que necesitamos que lea está en la misma ubicación donde estamos corriendo el comando