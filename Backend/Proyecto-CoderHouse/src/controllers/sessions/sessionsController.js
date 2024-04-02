import passport from "passport";
import Route from "../../router/class.routes.js"

class SessionRouter extends Route {
    init() {
        this.get('/current', ['USER', 'ADMIN'], function(req, res){
            try {
                req.cookies.jwtCookieToken ? res.sendSuccess(req.user) : res.sendClientError({message: 'No eres un usuario logeado'});
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });
    }
};

export default SessionRouter;