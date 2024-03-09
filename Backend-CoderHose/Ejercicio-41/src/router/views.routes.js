import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render('index', {});
});

//Login
router.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.json({ error: "error logout", mensaje: "Error al cerrar la sesion" });
        }
        res.send("Sesion cerrada correctamente.");
    });
});

//Auth middleware:
function auth(req, res, next) {
    if (req.session.user && req.session.admin) {
        return next();
    } else {
        return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
    }
}

router.get('/private', auth, (req, res) => {
    res.send("Si estas viendo esto es porque pasaste la autorización a este recurso!");
});

export default router;