import { Router } from "express";
const router = Router();

const data = {
    title: "Ejercicio",
    name: "German",
    fileCss: "styles.css",
}

router.get("/", function(req, res){
    res.render("welcome", data);
});


// Pertenece a --> socket1(io);
router.get("/form", function(req, res){
    res.render("form", data);
});

router.post("/user", function(req, res){
    const { name, age } = req.body;
    const users = [];
    users.push({
        name,
        age,
    });
});

// Pertenece a --> socket2(io);
router.get("/realtimeposts", function(req, res){
    res.render("posts", {"fileCss": "styles.css"});
});

// Pertenece a --> socket3(io);
router.get("/chat", function(req, res){
    res.render("chat", data);
});

// Pertenece a --> socket4(io);
router.get("/room", function(request, response){
    response.render("room", data);
});

export default router;
