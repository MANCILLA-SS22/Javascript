import { Router } from "express";
import { alumnoModel } from "../services/dao/mongo/models/alumno.model.js";

const router = Router();

router.get("/students", async function(req, res){
    const { page, limit } = req.query;

    // const order = "asc" - 1
    const students = await alumnoModel.paginate(
        {
            group: "1A" // Criterio de busqueda
        },
        {
            page: page || 1,
            limit: limit || 5,
        });

    console.log(students)    
    res.render("students", {students}); // res.json(students);
});

export default router;