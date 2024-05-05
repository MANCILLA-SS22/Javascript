import Route from "../../router/class.routes.js"

// import { productService } from "../../database/factory.js";
import { productService } from "../../database/service.js";
import { ProductDto } from "../../database/dto/Product.dto.js";
import { generateMock } from "../../mocks/productMocks.js";
import { productError } from "../../errors/product/product.error.js";
import { io } from "../../socket/socketServer.js";


class ProductRouter extends Route{
    init(){
        this.get("/mockingproducts", ['PUBLIC'], function(req, res){
            const products = generateMock(100);
            res.sendSuccess(products);
        });

        this.get("/", ['ADMIN', 'USER', 'PREMIUM'], async function(req, res){
            try {
                // console.log("req.user", req.user);
                // Copiar y pegar en barra de navegacion --> http://localhost:5500/api/products?page=1&limit=3&sort=asc&stock=8&category=New
                let {category, stock, limit, page, sort} = req.query;
                let numLimit, numPage, filter, numSort, prevSort, nextLink, prevLink;

                let link = req.protocol+"://"+req.get("host")+'/api/products'; //Obtenemos el link original
        
                if(category == undefined && stock == undefined)   filter = { category: {$regex: "Old"}, stock: {$gte: 1} }
                if(category === undefined && stock !== undefined) filter = { stock: {$gte: stock} };
                if(category !== undefined && stock === undefined) filter = { category: {$regex: category} };
                if(category !== undefined && stock !== undefined) filter = { category: {$regex: category}, stock: {$gte: stock} }; //$regex --> Selects documents where values match a specified regular expression. $gte --> Matches values that are greater than or equal to a specified value.
                page === undefined ? numPage = 1 : numPage = page
                limit === undefined ? numLimit = 10 : numLimit = limit;

                if(sort === "asc"){
                    prevSort = "asc";
                    numSort = 1;
                }else if(sort === "desc"){
                    prevSort = "desc";
                    numSort = -1;
                }else if(sort === undefined){
                    prevSort = "asc";
                    numSort = 1;
                }

                let conditionalQuery = {
                    page: numPage,
                    limit: numLimit,
                    sort: {price: numSort }
                };
        
                const products = await productService.getProductsNew(filter, conditionalQuery); // Model.paginate([filter], [options], [callback])
                products.hasPrevPage === false ? prevLink = null : prevLink = link + "?"+ `page=${products.prevPage}`+ `&limit=${numLimit}&sort=${prevSort}&category=${category}`;
                products.hasNextPage === false ? nextLink = null : nextLink = link + "?"+ `page=${products.nextPage}`+ `&limit=${numLimit}&sort=${prevSort}&category=${category}`;
        
                const respuestaInfo = {
                    status: "success",                 //success/error
                    payload: products.docs,            //Resultado de los productos solicitados
                    numItems: products.docs.length,    //Resultado de la cantidad de productos solicitados
                    totalPages: products.totalPages,   //Total de páginas
                    prevPage: products.prevPage,       //Página anterior
                    nextPage: products.hasNextPage,    //Página siguiente
                    page: products.page,               //Página actual
                    hasPrevPage: products.hasPrevPage, //Indicador para saber si la página previa existe
                    hasNextPage: products.hasNextPage, //Indicador para saber si la página siguiente existe.
                    prevLink: prevLink,                //Link directo a la página previa (null si hasPrevPage=false)   
                    nextLink: nextLink,                //Link directo a la página siguiente (null si hasNextPage=false)
                    link: link,                        //http://localhost:5500/products?page=1&limit=3&sort=asc&stock=8&category=New
                    user: req.user
                }; console.log("products --> ", respuestaInfo)
                res.sendSuccess(respuestaInfo);
        
            } catch (error) {
                req.logger.fatal("Poductos no encontrados")
                res.status(404).json({ mesagge:"No hay nada!!" });
            } 
        
        });

        this.get("/:pid", ['PUBLIC'], async function(req, res){
            try {
                const {pid} = req.params;
                const getById = await productService.getProductById(pid);
                getById ? res.sendSuccess(getById) : res.sendClientError({message: "Not product found by ID"});
            } catch (error) {
                req.logger.error("Poductos no encontrados");
                res.sendServerError(`something went wrong ${error}`);
            }
        });

        this.post("/", ['ADMIN'], async function(req, res){
            try {
                const productDto = new ProductDto(req.body, req.user.email);
                console.log("productDto", productDto);

                if (productDto.title !== undefined && productDto.description !== undefined && productDto.price !== undefined && productDto.thumbnail !== undefined && productDto.code !== undefined && productDto.stock !== undefined && productDto.category !== undefined) {
                    const crearProducto = await productService.addProduct(productDto);

                    if(crearProducto?.error){
                        res.status(409).json({error: crearProducto.error})
                        return;
                    };

                    const getAll = await productService.getProducts();
                    io.emit("product_list", getAll);
                    res.sendSuccess(crearProducto);
                
                }else{
                    productError(productDto);
                    res.sendClientError({message: "Not enough information."});
                }

            } catch (error) {
                // console.log("error.cause.toString() --> ", error.cause.toString())
                // req.logger.error(error.cause.toString().toString());
                res.sendServerError(`something went wrong ${error.cause.toString()}`)
            }
        });

        this.put("/:pid", ['ADMIN'], async function(req, res){
            try {
                const {pid} = req.params;
                const productDto = new ProductDto(req.body, req.user.email);
                console.log("productDto", productDto);
            
                const verificarId = await productService.getProductById(pid);
                if(!verificarId) res.sendClientError({message: "Not found id."});

                const verifyExistenceUndefined = Object.values(productDto).indexOf(undefined);
                if (verifyExistenceUndefined === -1) {
                    const actualizarProducto = await productService.updateProduct(pid, productDto);
                    const getAll = await productService.getProducts();
                    io.emit("product_list", getAll);
                    res.sendSuccess(actualizarProducto);
                }else{
                    productError(productDto);
                    res.sendClientError({message: "Not enough information."});
                }
                
            } catch (error) {
                // req.logger.error(error.cause.toString());
                res.sendServerError(`something went wrong ${error}`);
            }
        });

        this.delete("/:pid", ['ADMIN', 'PREMIUM'], async function(req, res){
            try {
                const {pid} = req.params;
                const verificarId = await productService.getProductById(pid);
                if(!verificarId) res.sendClientError({message: "Not found id."});
                const eliminarProducto = await productService.deleteProduct(pid);
                const getAll = await productService.getProducts();
                io.emit("product_list", getAll);
                res.sendSuccess(eliminarProducto);
            } catch (error) {
                res.sendServerError(`something went wrong ${error}`)
            }
        });
    };
};

export default ProductRouter;