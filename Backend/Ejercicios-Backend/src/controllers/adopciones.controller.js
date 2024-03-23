import { usuarioService, mascotaService, adopcionService } from "../database/service.js";

async function getAllAdoptions(req, res){
    const result = await adopcionService.getAll();
    res.send({status:"success",payload:result})
}

async function getAdoption(req, res){
    const adoptionId = req.params.aid;
    const adoption = await adopcionService.getBy({_id:adoptionId})
    if(!adoption) return res.status(404).send({status:"error",error:"Adoption not found"})
    res.send({status:"success",payload:adoption})
}

async function createAdoption(req, res){
    const {uid,pid} = req.params;
    const user = await usuarioService.getUserById(uid);
    if(!user) return res.status(404).send({status:"error", error:"user Not found"});
    const pet = await mascotaService.getBy({_id:pid});
    if(!pet) return res.status(404).send({status:"error",error:"Pet not found"});
    if(pet.adopted) return res.status(400).send({status:"error",error:"Pet is already adopted"});
    user.pets.push(pet._id);
    await usuarioService.update(user._id,{pets:user.pets})
    await mascotaService.update(pet._id,{adopted:true,owner:user._id})
    await adopcionService.create({owner:user._id,pet:pet._id})
    res.send({status:"success",message:"Pet adopted"})
}

export {createAdoption,getAllAdoptions,getAdoption}