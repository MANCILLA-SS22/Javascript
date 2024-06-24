import { __dirname } from "../dirname.js";

function main(req, res) {
    res.status(404);
    if (req.accepts('html')) res.sendFile(path.join(__dirname, 'views', '404.html')); 
    if (req.accepts('json')) res.json({ "error": "404 Not Found" });
    res.type('txt').send("404 Not Found");
}

export default main;