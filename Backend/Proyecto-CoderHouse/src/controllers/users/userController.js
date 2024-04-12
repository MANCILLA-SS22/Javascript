// ✓  Crear un endpoint en el router de usuarios api/users/:uid/documents con el método POST que permita subir uno o múltiples archivos. Utilizar el middleware de Multer para poder
//    recibir los documentos que se carguen y actualizar en el usuario su status para hacer saber que ya subió algún documento en particular.
// ✓ El middleware de multer deberá estar modificado para que pueda guardar en diferentes carpetas los diferentes archivos que se suban.
//    ○ Si se sube una imagen de perfil, deberá guardarlo en una carpeta profiles, en caso de recibir la imagen de un producto, deberá guardarlo en una carpeta products, 
//      mientras que ahora al cargar un documento, multer los guardará en una carpeta documents.
// ✓ Modificar el endpoint /api/users/premium/:uid para que sólo actualice al usuario a premium si ya ha cargado los siguientes documentos:
//    ○ Identificación, Comprobante de domicilio, Comprobante de estado de cuenta
// En caso de llamar al endpoint, si no se ha terminado de cargar la documentación, devolver un error indicando que el usuario no ha terminado de procesar su documentación.
// (Sólo si quiere pasar de user a premium, no al revés)

import Route from "../../router/class.routes.js"
import { userService } from "../../database/service.js";
import { uploader } from "../../utils/multer.js";

class UserRouter extends Route {
    init(){
        this.post("/documents/:uid", ['USER', 'ADMIN', 'PREMIUM'], uploader.any(), documents); //loader.any --> Accepts all files that comes over the wire. An array of files will be stored in req.files
        this.get("/premium/:email", ['PUBLIC'], change_rol);
        this.put("/premium/:uid", ['PUBLIC'], modify);

        async function change_rol(req, res){
            try {
                const {email} = req.body;
                const user = await userService.findUser(email);
                if(user.role === 'USER'){
                    await userService.updateRole(email, "PREMIUM");
                    res.json({message: "Usuario actualizado a PREMIUM"})
                }else if(user.role === 'PREMIUM'){
                    await userService.updateRole(email, "USER");
                    res.json({message: "Usuario actualizado a USER"})
                }else{
                    res.json({message: "Sin cambios"})
                }
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }

        };

        async function documents(req, res){
            try {
                if(req.user.role === "PREMIUM") return res.sendSuccess("Ya eres un usuario PREMIUM!");
                res.sendSuccess(`Los archivos ${req.files[0].filename} se han enviado correctamente!`)
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }
        }

        async function modify(req, res){

        }        
    }
}

export default UserRouter;