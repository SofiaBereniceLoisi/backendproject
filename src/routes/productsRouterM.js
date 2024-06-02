import { Router } from "express";

// Controllers de MongoDB
import * as controllers from "../controllers/productControllerM.js";

const productsRouterM = Router();

// -------------- ENDPOINTS MONGO DB -------------------------------------------------------------------------

productsRouterM.get("/", controllers.getAll);

productsRouterM.get("/:id", controllers.getById);

productsRouterM.post("/", controllers.create);

productsRouterM.put("/:id", controllers.update);

productsRouterM.delete("/:id", controllers.remove);

export default productsRouterM;