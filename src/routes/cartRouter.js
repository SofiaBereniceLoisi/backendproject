import { Router } from "express";
import CartController from "../controllers/cartController.js";

const cartController = new CartController();

const router = Router();

router.route('/')
    .get(cartController.getAll)
    .post(cartController.create)

router.route('/:id')
    .get(cartController.getById)
    .put(cartController.update)
    .delete(cartController.delete)

router.route('/:cid/products/:pid')
    .post(cartController.addProdToCart)
    .delete(cartController.removeProdToCart)
    .put(cartController.updateProdQuantityToCart)

router.delete("/clear/:cid", cartController.clearCart);

export default router;