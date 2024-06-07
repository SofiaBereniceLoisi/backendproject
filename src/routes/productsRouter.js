import { Router } from "express";

//Controllers de fileSystem
//import * as controllers from "../controllers/productControllerFS.js"

// Controllers de MongoDB
import * as controllers from "../controllers/productControllerM.js";

const productsRouter = Router();

// ---------------- ENDPOINTS FILE SYSTEM --------------------------------------------------------------------------------
productsRouter.get('/', controllers.getAll)

productsRouter.get('/:id', controllers.getById)

productsRouter.post("/", controllers.create)

productsRouter.put("/:id", controllers.update);

productsRouter.delete("/:id", controllers.remove);

export default productsRouter;