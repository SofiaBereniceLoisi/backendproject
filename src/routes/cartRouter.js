import { Router } from "express";
import CartController from "../controllers/cartController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/isAuth.js";

const cartController = new CartController();
const cartRouter = Router();

cartRouter.route('/')
    .get([isAuth, isAdmin], cartController.getAll)
    .post([isAuth, isAdmin], cartController.create)

cartRouter.route('/:id')
    .get([isAuth], cartController.getById)
    .put([isAuth, isAdmin], cartController.update)
    .delete([isAuth, isAdmin], cartController.delete)

cartRouter.route('/products/:pid')
    .post([isAuth], cartController.addProdToCart)
    .delete([isAuth], cartController.removeProdToCart)
    .put([isAuth], cartController.updateProdQuantityToCart)

cartRouter.route('/products/delete/:pid')
    .post([isAuth], cartController.removeProdToCart)

cartRouter.route('/products/update/:pid')
    .post([isAuth], cartController.updateProdQuantityToCart)

cartRouter.route("/clear/:cid")
    .post([isAuth], cartController.clearCart) //este es ara poder usarlo desde el boton en vista
    .delete([isAuth], cartController.clearCart);

export default cartRouter;