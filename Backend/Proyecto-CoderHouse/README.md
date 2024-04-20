
# Desafio 15

## Descripcion

   
1. Mover la ruta suelta /api/users/premium/:uid a un router específico para usuarios en /api/users/
     
2. Modificar el modelo de User para que cuente con una nueva propiedad “documents” el cual será un array que contenga los objetos con las siguientes propiedades. 
- name: String (Nombre del documento).
- reference: String (link al documento).
       
No es necesario crear un nuevo modelo de Mongoose para éste.
    
3.  Además, agregar una propiedad al usuario llamada “last_connection”, la cual deberá modificarse cada vez que el usuario realice un proceso de login y logout
     
4. Crear un endpoint en el router de usuarios api/users/:uid/documents con el método POST que permita subir uno o 
     múltiples archivos. Utilizar el middleware de Multer para 
     poder recibir los documentos que se carguen y actualizar en 
     el usuario su status para hacer saber que ya subió algún 
     documento en particular.
    
5.  El middleware de multer deberá estar modificado para que 
     pueda guardar en diferentes carpetas los diferentes archivos 
     que se suban.
- Si se sube una imagen de perfil, deberá guardarlo en una carpeta profiles, en caso de recibir la imagen de un producto, deberá guardarlo en una carpeta products, mientras que ahora al cargar un documento, multer los guardará en una carpeta documents.
        
6. Modificar el endpoint /api/users/premium/:uid para que sólo actualice al usuario a premium si ya ha cargado los siguientes documentos:    
- Identificación, Comprobante de domicilio, Comprobante de estado de cuenta

## Metodologia

Revisar los la carpeta src/controllers/users. En donde se espefician los edpoints que se deben evaluar mediane postman

1. El primer punto, debe evaluar el link mediante un GET: http://localhost:5500/users/premium/modify/661ef29e277276477df27e1e 
Aqui, se verificara si, primeramente es un 'USER'. Si no lo es, se enviara un mensaje de "ya eres un usuario PREMIUM". Despues se verificara si existen los documentos documents, comprobanteDeCuenta y comprobanteDeDomicilio. Si uno de los 3 no existen, aparecera un mensaje de error. De lo contrario, el rol de usuario cambiara a PREMIUM.

2. El segundo punto evaluara el siguiente link mediante un POST: http://localhost:5500/users/6621ef3316d858690f660602/documents
Aqui se deberan cargar (uno por uno) los siguientes documentos con las key "profile", "product", "document", "comprobanteDeDomicilio', "comprobanteDeCuenta" respectivamente. Los archivos se cargaran en un array de objetos cuyo parametro es "documents".

3. Para la propiedad "last_connection", esta fue agregada en el endpoint de "login" en el archivo authController. Dicha propiedad inicialmente se creo en el user.model.js y es de tipo string. 
Volviendo al enpoint login, este se actualizara cada que el usuario inicie y cierre sesion.