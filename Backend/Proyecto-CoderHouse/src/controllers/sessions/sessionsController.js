import passport from "passport";
import Route from "../../router/class.routes.js"

class SessionRouter extends Route {
    init() {
        this.get('/current', ['PUBLIC'], passport.authenticate('jwt', { session: false }), function(req, res){
            try {
                if (req.cookies.jwtCookieToken) {
                    res.sendSuccess(req.user);
                }
                else {
                    res.sendClientError({message: 'no eres un usuario logeado'});
                }
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });
    }
};

export default SessionRouter;