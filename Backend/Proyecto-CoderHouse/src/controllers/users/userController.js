import Route from "../../router/class.routes.js";
import fs from "fs"
import { userService } from "../../database/service.js";
import { uploader } from "../../utils/multer.js";
import { sendNotification } from "../../config/adapter/NodemailerAdapter.js";

class UserRouter extends Route {
    init(){
        this.get("/", ['ADMIN'], getAll);
        this.delete("/deleteAll", ['ADMIN'], deleteAll);
        this.delete("/deleteOne/:uid", ['ADMIN'], deleteOne);
        this.put("/premium/:uid", ['USER', 'PREMIUM'], modify);
        this.post("/:id/documents", ['USER', 'PREMIUM'], uploader.any(), documents); //loader.any --> Accepts all files that comes over the wire. An array of files will be stored in req.files
        
        this.get("/premium/:email", ['ADMIN'], change_rol);

        async function getAll(req, res){
            try {
                const allUsers = await userService.getAllUsers();
                allUsers ? res.sendSuccess(allUsers) : res.sendClientError({message: "Not users found"});
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }            
        };

        async function deleteAll(req, res){
            try {
                const now = Date.now(); //172800000 = 2 dias
                const allUsers = await userService.getAllUsers();
                if(!allUsers) res.sendClientError({message: "Not users found"});

                allUsers.forEach(async function(event){
                    const conex = Date.parse(event.last_connection);
                    const verify = now - conex;
                    if(verify >= 172800000){
                        if(event.role !== "ADMIN") return console.log(`No se puede eliminar a un usuario de tipo administrador!!`);
                        await userService.deleteUsers(event._id);
                        if(event.role === "PREMIUM"){
                            const emailSend = await sendNotification(event.email, {
                                message: `Lo sentimos. Hemos eliminado su cuenta debido a dos dias de inactividad. Favor de volverse a registrar.`,
                                subject: "Eliminacion de cuenta"
                            });
                        }
                    }else{
                        console.log(`El usuario ${event.email} aun no excede el tiempo limite!`);
                    }
                });
                res.sendSuccess("Informacion actualizada correctamente");
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }
        };

        async function deleteOne(req, res){
            try {
                const {uid} = req.params;
                const getId = await userService.findById(uid);
                if(!getId) res.sendClientError({message: "Not user found"});
                await userService.deleteUsers(getId._id);
                res.sendSuccess("Usuario eliminado correctamente");
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }
        };        

        async function modify(req, res){
            try {
                const {uid} = req.params;
                const getId = await userService.findById(uid);

                if(getId.role === "USER"){
                    const pathDocuments = `${process.cwd()}/src/files/documents/${getId.email}`;
                    const pathComprobanteDeCuenta = `${process.cwd()}/src/files/comprobanteDeCuenta/${getId.email}`;
                    const pathComprobanteDeDomicilio = `${process.cwd()}/src/files/comprobanteDeDomicilio/${getId.email}`;
                    if(!fs.existsSync(pathDocuments) || !fs.existsSync(pathComprobanteDeCuenta) || !fs.existsSync(pathComprobanteDeDomicilio)) return res.sendClientError("No se ha completado la documentacion!");
                    const roleChange = { USER: "PREMIUM", PREMIUM: "USER" };
                    const newRole = roleChange[getId.role];
                    await userService.updateRole(getId.email, newRole);
                    res.sendSuccess("Rol de usuario actualizado!");
                };
                return res.sendClientError({message: "Ya eres un usuario premium!!"});
            }catch (error){
                res.sendServerError(`something went wrong ${error}`);
            }
        };

        async function documents(req, res){
            try {
                // console.log("req.files", req.files);
                const { id } = req.params;
                const updateUser = await userService.updateUser(id, {
                    $push: {
                        documents: {name: req.files[0].fieldname, reference: req.files[0].destination}
                    }
                });

                // console.log(updateUser);
                if(req.user.role === "PREMIUM") return res.sendSuccess("Ya eres un usuario PREMIUM!");
                res.sendSuccess(`Los archivos ${req.files[0].filename} se han enviado correctamente!`);
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }
        };

        async function change_rol(req, res){
            try {
                const {email} = req.params;
                const user = await userService.findUser(email);
                if(user.role === 'USER'){
                    await userService.updateRole(email, "PREMIUM");
                    res.json({message: "Usuario actualizado a PREMIUM"});
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
    }
}

export default UserRouter;