import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
//Controllers de fileSystem
//import * as controllers from "../controllers/productControllerFS.js"

// Controllers de MongoDB
import ProductController from "../controllers/productControllerM.js";

const productsRouter = Router();
const productController = new ProductController();

import * as ProductsControllers from '../controllers/productControllerM.js';

productsRouter.route('/mockingproducts')
    .post(ProductsControllers.createProd)
    .get(ProductsControllers.getProds)

productsRouter.route('/')
    .get([isAuth], productController.getAll)
    .post([isAuth, isAdmin], productController.create)

productsRouter.route('/:id')
    .get([isAuth], productController.getById)
    .put([isAuth, isAdmin], productController.update)
    .delete([isAuth, isAdmin], productController.delete)

export default productsRouter;