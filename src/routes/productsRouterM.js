import { Router } from "express";

// Controllers de mongo
import * as controllers from "../controllers/productControllerM.js";

const productsRouterM = Router();

// -------------- ENDPOINTS MONGO DB -------------------------------------------------------------------------

productsRouterM.get("/", controllers.getAllProducts);

productsRouterM.get("/:id", controllers.getProductById);

productsRouterM.post("/", controllers.createProduct);

productsRouterM.put("/:id", controllers.updateProduct);

productsRouterM.delete("/:id", controllers.deleteProduct);

export default productsRouterM;