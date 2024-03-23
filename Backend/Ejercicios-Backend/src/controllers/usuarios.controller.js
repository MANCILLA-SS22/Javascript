import { usuarioService } from "../database/service.js";

async function getAllUsers(req,res){
    console.log("Llamando API getAllUsers");
    const users = await usuarioService.getAll();
    res.send({ status: "success", payload: users })
}

async function getUser(req,res){
    const userId = req.params.uid;
    const user = await usuarioService.getUserById(userId);
    if (!user) return res.status(404).send({ status: "error", error: "User not found" })
    res.send({ status: "success", payload: user })
}

async function updateUser(req,res){
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usuarioService.getUserById(userId);
    if (!user) return res.status(404).send({ status: "error", error: "User not found" })
    const result = await usuarioService.update(userId, updateBody);
    res.send({ status: "success", message: "User updated" })
}

async function deleteUser(req,res){
    const userId = req.params.uid;
    const result = await usuarioService.getUserById(userId);
    res.send({ status: "success", message: "User deleted" })
}

export { deleteUser, getAllUsers, getUser, updateUser }