import { Router } from "express";

//Controllers de fileSystem
//import * as controllers from "../controllers/productControllerFS.js"

// Controllers de MongoDB
import * as controllers from "../controllers/productControllerM.js";

const productsRouter = Router();

productsRouter.route('/')
    .get(controllers.getAll)
    .post(controllers.create)

productsRouter.route('/:id')
    .get(controllers.getById)
    .put(controllers.update)
    .delete(controllers.remove)

export default productsRouter;