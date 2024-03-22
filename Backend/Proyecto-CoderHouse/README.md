
# Desafio 12 (Tercera practica integradora)
## Descripcion

1. Realizar un sistema de recuperación de contraseña, la cual envíe por medio de un correo 
un botón que redireccione a una página para restablecer la contraseña (no recuperarla).
   - link del correo debe expirar después de 1 hora de enviado.
   - Si se trata de restablecer la contraseña con la misma contraseña del usuario, debe
     impedirlo e indicarle que no se puede colocar la misma contraseña
   - Si el link expiró, debe redirigir a una vista que le permita generar nuevamente el    
     correo de restablecimiento, el cual contará con una nueva duración de 1 hora.

2. Establecer un nuevo rol para el schema del usuario llamado “premium” el cual estará habilitado también para crear productos

3. Modificar el schema de producto para contar con un campo “owner”, el cual haga referencia a la persona que creó el producto.

  - Si un producto se crea sin owner, se debe colocar por defecto “admin”.
  - El campo owner deberá guardar sólo el correo electrónico (o _id, lo dejamos a tu 
      conveniencia) del usuario que lo haya creado (Sólo podrá recibir usuarios premium)

4. Modificar los permisos de modificación y eliminación de productos para que:
  - Un usuario premium sólo pueda borrar los productos que le pertenecen.
  - El admin pueda borrar cualquier producto, aún si es de un owner.

5. Además, modificar la lógica de carrito para que un usuario premium NO pueda agregar a su carrito un producto que le pertenece.

6. Implementar una nueva ruta en el router de api/users, la cual será /api/users/premium/:uid la cual permitirá cambiar el rol de un usuario, de “user” a “premium” y viceversa.
## Metodologia



### Punto 1

Los links para levantar el servidor son los siguientes: 
- nodemon src/backend.js --mode prod   -->   Servidor escuchando por el puerto: 3001
- nodemon src/backend.js --mode dev    -->   Servidor escuchando por el puerto: 5500

Ahora los links con los endpoints referentes para el primer punto son los siguientes:
- localhost:5500/passwordForget
- localhost:5500/passwordReset/:id

Y los archivos donde se encuentra la logica son: 
- viewsController.js
- usersController.js

### Punto 2 y 3
Revisar el archivo products.model.js. Ahi se anade la popiedad "owner". Para la creacion de un nuevo producto se utiliza postman, en el cual no se define ninguna propiedad owner. Solamente se la informacion del producto. Ejemplo: 

    {
        "title": "Makarov", 
        "description": "Hand gun", 
        "price": 450, 
        "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Makarov_%2828034065%29.jpeg/1200px-Makarov_%2828034065%29.jpeg",
        "code": "SS2022",
        "stock": 22,
        "status": true,
        "category": "New"
    }

Pero para crear un producto necesitamos estar loggeados. (Se puede loggear mediante postman o desde la app). 
Entonces, al estar loggeado , el codigo extrae, en este caso, el nombre de ese correo y lo agrega a la propiedad owner, la cual se podra observar en la base de datoas de mongo.
Esto no funciona para otros usuarios puesto que unicamente "ADMIN" y "PREMIUM" pueden hacerlo.

### Punto 5 
Los cambios para este punto se observan en el archivo controllerProducts.js, para el route de delete. Para realizar movimientos, ir al link en postman:
- localhost:5500/api/products/:id

### Punto 6
Finalmente, para el ultimo punto ir a postman y colocar el siguiente link
- localhost:5500/api/auth/premium/:email

En donde colocaremos el email al que deseemos cambiar el tipo de usuario
