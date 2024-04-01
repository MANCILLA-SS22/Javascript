import { Router } from 'express';

const router = Router();

router.get('/', function(ree, res){
    // res.sendStatus(201);
    // res.download("src/backend.js");
    // res.render("index", {text: "World"});

    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h1>home page</h1>')
    res.end()    
});

export default router;