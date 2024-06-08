import { Router } from "express";
import * as controller from "../controllers/cartController.js";

const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.remove);

router.post("/:cid/products/:pid", controller.addProdToCart);

router.delete("/:cid/products/:pid", controller.removeProdToCart);

router.put("/:cid/products/:pid", controller.updateProdQuantityToCart);

router.delete("/clear/:cid", controller.clearCart);

export default router;