import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isPremium } from "../middlewares/isPremium.js";
//Controllers de fileSystem
//import * as controllers from "../controllers/productControllerFS.js"

// Controllers de MongoDB
import ProductController from "../controllers/productControllerM.js";

const productsRouter = Router();
const productController = new ProductController();

import * as ProductsControllers from '../controllers/productControllerM.js';
import { isAdminOrIsPremium } from "../middlewares/isAdminOrIsPremium.js";

productsRouter.route('/mockingproducts')
    .post([isAuth, isAdmin], ProductsControllers.createProd)
    .get([isAuth, isAdmin], ProductsControllers.getProds)

productsRouter.route('/')
    .get([isAuth], productController.getAll)
    .post([isAuth, isAdminOrIsPremium], productController.create)

productsRouter.route('/:id')
    .get([isAuth], productController.getById)
    .put([isAuth, isAdminOrIsPremium], productController.update)
    .delete([isAuth, isAdminOrIsPremium], productController.delete)

// rutas con solo get y post para usar a partir de formularios (en vistas de administrador)
productsRouter.route('/admin/products')
    .get([isAuth, isAdminOrIsPremium], productController.showProductsListToAdmin)
    .post([isAuth, isAdminOrIsPremium], productController.create)

productsRouter.route('/admin/product/:id')
    .post([isAuth, isAdminOrIsPremium], productController.delete)

productsRouter.route('/admin/product/update/:id')
    .post([isAuth, isAdminOrIsPremium], productController.update)

export default productsRouter;