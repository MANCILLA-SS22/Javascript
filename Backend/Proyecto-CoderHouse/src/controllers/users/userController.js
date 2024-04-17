// Desde el router de /api/users, crear tres rutas:
// ✓ GET / deberá obtener todos los usuarios, éste sólo debe devolver los datos principales como nombre, correo, tipo de cuenta (rol)
// ✓ DELETE / deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días. (puedes hacer pruebas con los últimos 30 minutos, por ejemplo). 
//    Deberá enviarse un correo indicando al usuario que su cuenta ha sido eliminada por inactividad

// Crear una vista para poder visualizar, modificar el rol y eliminar un usuario. Esta vista únicamente será accesible para el administrador del ecommerce
// Modificar el endpoint que elimina productos, para que, en caso de que el producto pertenezca a un usuario premium, le envíe un correo indicándole que el producto fue eliminado.


import Route from "../../router/class.routes.js";
import fs from "fs"
import { userService } from "../../database/service.js";
import { uploader } from "../../utils/multer.js";

class UserRouter extends Route {
    init(){
        this.get("/premium/:email", ['PUBLIC'], change_rol);
        this.put("/premium/:id", ['USER', 'PREMIUM'], modify);
        this.post("/:id/documents", ['USER', 'ADMIN', 'PREMIUM'], uploader.any(), documents); //loader.any --> Accepts all files that comes over the wire. An array of files will be stored in req.files

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
                console.log("req.files", req.files);
                const { id } = req.params;
                const updateUser = await userService.updateUser(id, {
                    $push: {
                        documents: {name: req.files[0].fieldname, reference: req.files[0].destination}
                    }
                });

                console.log(updateUser)
                if(req.user.role === "PREMIUM") return res.sendSuccess("Ya eres un usuario PREMIUM!");
                res.sendSuccess(`Los archivos ${req.files[0].filename} se han enviado correctamente!`)
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }
        }

        async function modify(req, res){
            try {
                if(req.user.role === "USER"){
                    const path = `${process.cwd()}/src/files/documents/${req.user.email}`;
                    if(!fs.existsSync(path)) return res.sendClientError("No se ha completado la documentacion!");
                };

                const roleChange = {
                    USER: "PREMIUM",
                    PREMIUM: "USER"
                }

                const newRole = roleChange[req.user.role];
                await userService.updateRole(req.user.email, newRole)
            }catch (error){
                res.sendServerError(`something went wrong ${error}`);
            }
        }        
    }
}

export default UserRouter;