
# Desafio 14 (Testing)

## Descripcion

1. Se deben incluir por lo menos 3 tests desarrollados para:

    - Router de products.
    - Router de carts.
    - Router de sessions.

2. No desarrollar únicamente tests de status, la idea es trabajar lo mejor desarrollado posible las validaciones de testing.

## Metodologia

Se creo una carpeta "tests", en la cual se encuetra un solo archivo para testing. En el, se crearon los 3 test de desarrollo solicitados.

Para trabajar con supertest tendremos que trabajar con dos terminales, la perteneciente a la base de datos principal (Server) y una para pruebas (Testing).

- La primera estará pensada para ejecutar el servidor y dejarlo escuchando, listo para recibir las peticiones de nuestro test.     --> nodemon src/app.js --mode dev
- La otra terminal servirá para ejecutar el comando de test las veces que sean necesarias hasta finalizar con el flujo de pruebas. --> npx mocha tests/supertest.test.js
