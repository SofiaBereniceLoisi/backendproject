import { Router } from "express";

//Controllers de fileSystem
//import * as controllers from "../controllers/productControllerFS.js"

// Controllers de MongoDB
import ProductController from "../controllers/productControllerM.js";

const productsRouter = Router();
const productController = new ProductController();

productsRouter.route('/')
    .get(productController.getAll)
    .post(productController.create)

productsRouter.route('/:id')
    .get(productController.getById)
    .put(productController.update)
    .delete(productController.delete)

export default productsRouter;