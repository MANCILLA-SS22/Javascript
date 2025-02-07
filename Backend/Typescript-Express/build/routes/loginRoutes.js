"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
function requreAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    ;
    res.status(403);
    res.send('Not permitted');
}
const router = (0, express_1.Router)();
exports.router = router;
router.post("/login", function (req, res) {
    const { email, password } = req.body;
    if (email && password && email === "hi@hi.com" && password) {
        req.session = { loggedIn: true };
        res.redirect("/");
    }
    else {
        res.send("Invalid email or password");
    }
});
router.get("/logout", function (req, res) {
    req.session = undefined;
    res.redirect("/");
});
router.get("/", function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send(`
            <div>
                <div>You are logged in</div>
                <a href="/logout">Logout</a>
            </div>
        `);
    }
    else {
        res.send(`
            <div>
                <div>You are not logged in</div>
                <a href="/login">Login</a>
            </div>
        `);
    }
});
router.get('/protected', requreAuth, function (req, res) {
    res.send('Welcome to protected route, logged in user');
});
