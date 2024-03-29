import { Router } from "express";
import { alumnoModel } from "../database/dao/mongo/models/alumno.model.js";

const router = Router();

router.get("/students", async function(req, res){
    const { page, limit } = req.query;

    // const order = "asc" - 1
    const students = await alumnoModel.paginate(
        {
            // group: "1A" // Criterio de busqueda
        },
        {
            page: page || 1,
            limit: limit || 5,
        }
    );

    console.log(students)    
    res.render("students", {students}); // res.json(students);
});

router.get("/getAll", async function(req, res){
    const alumno = await alumnoModel.find();
    res.json(alumno);
})

export default router;