import { Router } from "express";
import CartController from "../controllers/cartController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/isAuth.js";

const cartController = new CartController();
const router = Router();

router.route('/')
    .get([isAuth, isAdmin], cartController.getAll)
    .post([isAuth, isAdmin], cartController.create)

router.route('/:id')
    .get([isAuth], cartController.getById)
    .put([isAuth, isAdmin], cartController.update)
    .delete([isAuth, isAdmin], cartController.delete)

router.route('/:cid/products/:pid')
    .post([isAuth], cartController.addProdToCart)
    .delete([isAuth], cartController.removeProdToCart)
    .put([isAuth], cartController.updateProdQuantityToCart)

router.delete("/clear/:cid", [isAuth], cartController.clearCart);

export default router;