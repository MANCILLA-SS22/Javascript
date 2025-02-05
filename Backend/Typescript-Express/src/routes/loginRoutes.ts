import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined };
}

function requreAuth(req: Request, res: Response, next: NextFunction){
    if (req.session && req.session.loggedIn){
        next();
        return;
    };

    res.status(403)
    res.send('Not permitted');
}

const router = Router();

router.get("/login", function (req: RequestWithBody, res: Response) {
    res.send(`
        <form method="POST">
            <div>
            <label>Email</label>
            <input name="email"/>
            </div>
            <div>
            <label>Password</label>
            <input name="password" type="password"/>
            </div>
            <button>Submit</button>
        </form>
    `);
});

router.post("/login", function (req: Request, res: Response) {
    const { email, password } = req.body;

    if (email && password && email === "hi@hi.com" && password) {
        req.session = { loggedIn: true };
        res.redirect("/");
    } else {
        res.send("Invalid email or password");
    }
});

router.get("/logout", function (req: Request, res: Response) {
    req.session = undefined;
    res.redirect("/");
});

router.get("/", function (req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
        res.send(`
            <div>
                <div>You are logged in</div>
                <a href="/logout">Logout</a>
            </div>
        `);
    }else{
        res.send(`
            <div>
                <div>You are not logged in</div>
                <a href="/login">Login</a>
            </div>
        `);
    }
});

router.get('/protected', requreAuth, function(req: Request, res: Response){
    res.send('Welcome to protected route, logged in user');
});

export { router };