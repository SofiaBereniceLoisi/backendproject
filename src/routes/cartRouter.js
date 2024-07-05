import { Router } from "express";
import * as controller from "../controllers/cartController.js";

const router = Router();

router.route('/')
    .get(controller.getAll)
    .post(controller.create)

router.route('/:id')
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.remove)

router.route('/:cid/products/:pid')
    .post(controller.addProdToCart)
    .delete(controller.removeProdToCart)
    .put(controller.updateProdQuantityToCart)

router.delete("/clear/:cid", controller.clearCart);

export default router;