import Route from "../../router/class.routes.js";

function verifyLoggin(req, res, next){
    if (req.cookies.jwtCookieToken){
        return res.redirect("/profile");
    }else{
        next();
    }
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

        this.get("/profile", ['USER'], function(req, res){
            try {
                res.status(200).render('profile');
            }
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });         
        
        this.get("/chat", ['USER'], function(req, res){
            try {
                res.render("chat");
            } catch (error) {
                res.status(500).send({ error: "Error consultando el chat", message: error });
            }
        });

        this.get('/products', ['USER'], function(req, res){
            try {
                res.status(200).render('products');
            }
            catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });

        this.get("/product/:pid", ['USER'], function(req, res){
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
                // const cars = CartJSON.getCart();
                // console.log(cars);
                // res.status(200).render('carts', {cars});
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
    } 
}

export default LoginRegister;