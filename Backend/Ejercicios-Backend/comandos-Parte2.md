# MOP

    0. Deshabilitar la base de datos de mongo al comentar "mongoInstance()" en nuestro archivo "backend.js"

    1. generar una nueva imagen (ya que no usamos mongo)
        > docker build -t ejercicios-de-backend-kubernetes .

    2. generamos el un nuevo tag y hacemos un push a dockerHub
        > docker tag ejercicios-de-backend-kubernetes germanss22/ejercicios-de-backend-kubernetes:1.0.1-test
        > docker push germanss22/ejercicios-de-backend-kubernetes:1.0.1-test
        
        > docker pull germanss22/ejercicios-de-backend-kubernetes:1.0.1-test

## comandos minikube

    3. Analisis del manifiesto "kube-users-creator.yaml"

    4. ejecutamos el .yaml
        > kubectl apply -f kube-users-creator.yaml

    5. comandos minikube
        > kubectl get deployments
        > kubectl get pods

    6. Visualizamos el servicio para ver si esta funcionando nuestro Load-Balancer (me va mostrar los puertos)
        hasta este punto tenemos toda la infra montada
        > kubectl get services

    7. ponemos a trabajar el minikube
        > minikube service list
        > minikube service ejercicios-de-backend-kubernetes-service

    7. pruebas en Postman

    9. Para saber cual de los 5 pods que creamos esta respondiendo
        > kubectl logs -f ejercicios-de-backend-kubernetes-deploy-65dcbb7746-vkmwk

## minikube

    - Iniciamos el ambiente
        > minikube start
        > (Opcional) Si obtenemos el siguiente error: Unable to resolve the current Docker CLI context "default": context "default": context not found
          Podemos ejecutar en la linea de comandos lo siguiente --> docker context use default
          Cabe recalcar que esto se mostraria como un warning, pero aun asi la aplicacion se levantara.

    - me dice el contexto en el que estoy   
        > kubectl config current-context 

    - si tuviera mas entornos
        > kubectl config use-context [NOMBRE-DEL-CONTEXTO]

    - me muestra los pods activos 
        > kubectl get pods

    - Me muestra los deploy activos
        > kubectl get deployments

    - Me muestra los servicios activos en el ambiente de kubernetes
        > kubectl get services

    - Elimino un determinado deploy(proceso padre/orquestador) y los pods
        > kubectl delete deployments ejercicios-de-backend-kubernetes-deploy

    - Vemos el listado de servicios
        > minikube service list
            |-------------|-------------------------------|--------------|-----|
            |  NAMESPACE  |             NAME              | TARGET PORT  | URL |
            |-------------|-------------------------------|--------------|-----|
            | default     | ejercicios-de-backend-kubernetes-service |         8080 |     |
            | default     | kubernetes                    | No node port |     |
            | kube-system | kube-dns                      | No node port |     |
            |-------------|-------------------------------|--------------|-----|

    - Ejecutamos el service en minikube
        > minikube service ejercicios-de-backend-kubernetes-service

            |-----------|-------------------------------|-------------|------------------------|
            | NAMESPACE | NAME | TARGET PORT | URL |
            |-----------|-------------------------------|-------------|------------------------|
            | default | ejercicios-de-backend-kubernetes-service | 8080 | http://192.168.49.2:32595 |
            |-----------|-------------------------------|-------------|------------------------|
            🏃 Starting tunnel for service ejercicios-de-backend-kubernetes-service.
            |-----------|-------------------------------|-------------|------------------------|
            | NAMESPACE | NAME | TARGET PORT | URL |
            |-----------|-------------------------------|-------------|------------------------|
            | default | ejercicios-de-backend-kubernetes-service | | http://127.0.0.1:59931 |
            |-----------|-------------------------------|-------------|------------------------|
            🎉 Opening service default/ejercicios-de-backend-kubernetes-service in default browser...
            ❗ Because you are using a Docker driver on darwin, the terminal needs to be
            open to run it.

    - Para ver los logs
        > kubectl logs -f ejercicios-de-backend-kubernetes-deploy-65dcbb7746-vkmwk
