import { ProductsRepository } from "./repository/products.repository.js";
import { ProductServiceMongo } from "./dao/mongo/services/product.service.js";
const productDao = new ProductServiceMongo();
const productService = new ProductsRepository(productDao);

import { CartsRepository } from "./repository/carts.repository.js";
import { CartServiceMongo } from "./dao/mongo/services/cart.service.js";
const cartDao = new CartServiceMongo();
const cartService = new CartsRepository(cartDao);

import { UsersRepository } from "./repository/users.repository.js";
import { UserServiceMongo } from "./dao/mongo/services/user.service.js";
const userDao = new UserServiceMongo();
const userService = new UsersRepository(userDao);


export {productService, cartService, userService};