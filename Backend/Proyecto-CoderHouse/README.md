
# Proyecto Final de CoderHouse-Backend 

## Descripcion del proyecto
El presente proyecto consiste en la creacion de una app ecommerce aplicando los conocimientos y temas vistos en el curso de backend. En el, se utilizan librerias como NodeJS, Express, Handlebars, entro otros.

## Caracteristicas principales
  - Navegación de Productos: Los usuarios pueden explorar diferentes categorías de productos y ver los detalles de cada producto.
  - Carrito de Compras: Los usuarios pueden agregar productos al carrito de compras, ver el resumen del carrito y proceder al proceso de pago.
  - Proceso de Pedido: Los usuarios pueden completar el proceso de pedido ingresando su información de envío y método de pago.
  - Integración de Pago: El proyecto cuenta con integración de pago utilizando una pasarela de pago externa (se debe proporcionar más información sobre la pasarela de pago utilizada).

## Instalacion del proyecto
1.- Descargar o clonar el repositorio (de preferencia descargarlo)

2.- Instalar los paquetes mediante

```bash
  npm i
```

3.- Ejecutar cualquiera de los dos comandos 
```bash
  node src/app.js --mode dev
```
```bash
  node src/app.js --mode prod
```

## Roles de Usuario y Credenciales
Existen distintos roles de usuario en la aplicación:
- ADMIN: Puede crear, eliminar y modificar productos, gestionar usuarios (cambiar su rol a premium y borrarlos), y gestionar carritos y tickets. Las credenciales de administrador son:
    * Email: xxcodigo.rojoxx@gmail.com
    * Contraseña: res

- User: Puede realizar un proceso de compra completo.
    * Email: coder_user_1@gmail.com
    * Contraseña: res

- Premium: Además de las funciones de usuario, puede crear productos y editar y borrar sus propios productos.
    * Email: coder_user_2@gmail.com
    * Contraseña: res

## Envio de correos con NodeMailer
* Se envía un email a un usuario premium cuando se elimina uno de sus productos.
* Se envía un email a los usuarios borrados por inactividad.
* Se envía un email al finalizar una compra con toda la información de la misma.
* El ecommerce dispone de un sistema de reseteado de contraseña protegido que funciona a través del envío de email con verificación.

## Pruebas y documentacion
Se han realizado pruebas de rendimiento y tests unitarios y de integración mediante mocha, chai y supertest. Además, la documentación de la API está disponible en Swagger en el endpoint /api/docs, donde se pueden probar todos los endpoints (se requieren credenciales de administrador para muchos de ellos).

