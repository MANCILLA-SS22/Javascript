import { Request, Response } from "express";
import { controller, bodyValidator, get, post } from "./decorators/importAll"

// function logger(req: Request, res: Response, next: NextFunction){
//     console.log("Request was made!!!");
//     next();
// }

@controller("/auth")
class LoginController {
    @get("/login")
    // @use(logger)
    getLogin(req: Request, res: Response) : void{
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
    };

    @post("/login")
    @bodyValidator('emai', 'password')
    postLogin(req: Request, res: Response) {
        const { email, password } = req.body;
    
        if (email && password && email === "hi@hi.com" && password) {
            req.session = { loggedIn: true };
            res.redirect("/");
        } else {
            res.send("Invalid email or password");
        }
    };

    @get("/logout")
    getLogout(req: Request, res: Response) {
        req.session = undefined;
        res.redirect("/");
    };
};

export {LoginController};