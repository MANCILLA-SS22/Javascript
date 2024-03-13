# Docker

    - Crear Imagen --> docker build -t [Nombre de la imagen a crear] .
        > docker build -t ejercicios-de-backend .
        > Una vez creada la imagen con el comando de arriba, pasar a la seccion de "## Subir IMG a DockerHub"

    - Crear una instancia de imagen  -->  docker run -p <Puerto interno>:<Puerto externo> [Nombre de la imagen creada]
        > docker ps
        > docker run -p 5500:5500 ejercicios-de-backend 

    - Usando ENV desde consola (Si NO tenemos descargada la imagen de MongoDB en nuestro docker pasar a la seccion de "## MONGO" primero)
        > docker run -e "MONGO_URL=mongodb+srv://xxeltiradorxx:coder1234@cluster0.hkcpkdd.mongodb.net/login?retryWrites=true&w=majority" -p 5500:5500 ejercicios-de-backend   (Si usamos mongo Atlas, IGNORAR lo de linea 22)

        > docker run -e "MONGO_URL=mongodb://172.17.0.2:27017/ejercicios-de-backend-docker-kubernetes?retryWrites=true&w=majority" -p 5500:5500 ejercicios-de-backend (Si usamos Mongo local, seguir antes los pasos 1 y 2)
         1.- docker ps  --> Necesitamos saber la ip donde esta corriendo el container. Este comando me muestra los contenedores que estan activos 
         2.- docker container inspect <id de nuestro contenedor obtenido con ayuda de docker ps en la terminal>    -->   docker container inspect [CONTAINER_ID]

## Subir IMG a DockerHub

    - Login
        > docker login
        > docker login -u [USER_NAME]  //(SOLO si tienen mas cuentas)

    - cramos Tag --> docker tag [imagen] <username>/[imagen:version]
        > docker tag ejercicios-de-backend germanss22/ejercicios-de-backend:1.0.0 
        > docker push germanss22/ejercicios-de-backend:1.0.0
        > docker pull germanss22/ejercicios-de-backend:1.0.0  (Esto SOLO se ejecuta si queremos descargar la imagen. Si ya esta descargada, no es necesario usar este comando)         

## MONGO

    - Bajamos una imagen de mongo (Ejecutar "mongod --version" en la consola para ver la version de nuestro MongoDB)
        > docker pull mongo:7.0.4
        > docker run --name mongodb -p 27017:27017 mongo:7.0.4
        > docker run --name mongodb -p 27017:27017 mongo:7.0.4 -d

    - Detener Mongo (solo si lo usamos como LOCAL y no en Mongo Atlas)
        > cmd --> Ejecutar services.msc --> Detener MongoDB
        > cmd --> Ejecutar services.msc --> Detener MongoDB
        > mongod --config /opt/homebrew/etc/mongod.conf --fork
        > mongosh        

## Detener imagenes que esten activas

    - docker stop [CONTAINER_ID]

## Opciones

    - https://www.youtube.com/watch?v=lzRY5Z59Bso&ab_channel=FaztCode
    - https://medium.com/zenofai/how-to-build-a-node-js-and-mongodb-application-with-docker-containers-15e535baabf5   --> Medium articulo para usar docker-compose.yml

## Instalacion - Revisar documentacion. url: <https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/>

    > curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/darwin/arm64/kubectl"

## Verificar la version kubectl

    kubectl es una herramienta de línea de comandos utilizada para interactuar con clústeres de Kubernetes. 
    > kubectl version --client
