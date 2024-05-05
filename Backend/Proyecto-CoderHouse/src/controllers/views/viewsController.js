import passport from "passport";
import Route from "../../router/class.routes.js";

function verifyLoggin(req, res, next){
    if (req.cookies.jwtCookieToken) return res.redirect("/profile");
    next();
}

class LoginRegister extends Route {        
        init(){

        //Metodo 2: Usando JWT por Cookie
        this.get("/", ['PUBLIC'], async function(req, res){
            try {
                res.status(200).redirect('/login')
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }
        });               

        this.get("/login", ['PUBLIC'], verifyLoggin, function(req, res){
            try {
                res.render('login');
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }
        });

        this.get("/passwordForget", ['PUBLIC'], function(req, res){
            try {
                res.status(200).render('passwordForget');
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });
        
        this.get("/passwordReset/:id", ['PUBLIC'], passport.authenticate('passwordUpdate', { session: false }), function(req, res){
            try {
                const expirationTime = new Date().getTime();
                (req.user.email && req.user.expirationTime && expirationTime > req.user.expirationTime) ? redirect('/passwordForget'): res.status(200).render('passwordReset');
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }
        });        

        this.get("/github/login", ['PUBLIC'], function(req, res){
            try {
                res.render("github-login");
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }            
        });
        
        this.get("/github/error", ['PUBLIC'], function(req, res){
            res.render("error", { error: "No se pudo autenticar usando GitHub!" });
        });          

        this.get("/register", ['PUBLIC'], function(req, res){
            res.render('register');
        });  

        this.get("/waitting", ['PUBLIC'], function(req, res){
            try {
                res.status(200).render('waitting');
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });

        this.get("/profile", ['USER', 'PREMIUM', 'ADMIN'], function(req, res){
            try {
                res.status(200).render('profile');
            }
            catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }
        });         
        
        this.get("/chat", ['USER'], function(req, res){
            try {
                res.render("chat");
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }
        });

        this.get("/realTimeProduct", ['USER', 'ADMIN'], function(req, res){
            try {
                res.render("realTimeProducts", {title: "Form example",fileCss: "styles.css"});
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }
        });        

        this.get('/products', ['USER', 'ADMIN'], function(req, res){
            try {
                res.status(200).render('products');
            }
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });

        this.get("/product/:pid", ['USER', 'ADMIN'], function(req, res){
            try {
                const {id} = req.params;
                res.status(200).render('productID', {id}); 
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });        

        this.get('/carts', ['USER'], function(req, res){
            try {
                res.status(200).render('carts');
            }
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });

        this.get("/cart/:cid", ['USER'], async function(req, res){
            try {
                res.status(200).render("cartID");
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });

        this.get("/loggerTest/:type", ['PUBLIC'], function(req, res){
            try {
                const {type} = req.params;
                switch(type){
                    case "fatal":
                        req.logger.fatal("Prueba de log level fatal!");
                        break;

                    case "error":
                        req.logger.error("Prueba de log level error!");
                        break;

                    case "warning":
                        req.logger.warning("Prueba de log level warning!");
                        break;

                    case "http":
                        req.logger.http("Prueba de log level http!");
                        break;

                    case "info":
                        req.logger.info("Prueba de log level info!");
                        break;

                    case "debug":
                        req.logger.debug("Prueba de log level debug!");                    
                        break;

                    default :
                        break;
                }
                res.status(200).json({message: 'succes'});
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`);
            }
        });

        this.get('/usersModify', ['ADMIN'], function(req, res){
            try {
                res.status(200).render('usersModify');
            }
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });
    } 
}

export default LoginRegister;