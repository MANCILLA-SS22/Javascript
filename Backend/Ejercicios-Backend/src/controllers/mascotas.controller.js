import { __dirname } from "../dirname.js";
import { mascotaService } from "../database/service.js";
import {MacotaDTO} from "../database/dto/Mascota.dto.js"

async function getAllPets(req,res){
    const pets = await mascotaService.getAll();
    res.send({status:"success",payload:pets})
}

async function createPet(req,res){
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    const pet = MacotaDTO.getPetInputFrom({name,specie,birthDate});
    const result = await mascotaService.create(pet);
    res.send({status:"success",payload:result})
}

async function updatePet(req,res){
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    const result = await mascotaService.update(petId,petUpdateBody);
    res.send({status:"success",message:"pet updated"})
}

async function deletePet(req,res){
    const petId = req.params.pid;
    const result = await mascotaService.delete(petId);
    res.send({status:"success",message:"pet deleted"});
}

async function createPetWithImage(req,res){
    const file = req.file;
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    console.log(file);
    const pet = MacotaDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image:`${__dirname}/../public/img/${file.filename}`
    });
    console.log(pet);
    const result = await mascotaService.create(pet);
    res.send({status:"success",payload:result})

}

export { getAllPets, createPet, updatePet, deletePet, createPetWithImage }