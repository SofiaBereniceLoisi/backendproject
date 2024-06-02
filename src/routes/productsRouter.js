import { Router } from "express";

//Controllers de fileSystem
import * as controllersFS from "../controllers/productControllerFS.js"

const productsRouter = Router();

// ---------------- ENDPOINTS FILE SYSTEM --------------------------------------------------------------------------------
productsRouter.get('/', controllersFS.getAll)

productsRouter.get('/:pid', controllersFS.getById)

productsRouter.post("/", controllersFS.create)

productsRouter.put("/:pid", controllersFS.update);

productsRouter.delete("/:pid", controllersFS.remove);

export default productsRouter;