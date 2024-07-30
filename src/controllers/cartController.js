import CartServices from '../services/cartService.js';
import { createResponse } from '../utils.js';
import Controllers from './mainController.js';

const cartService = new CartServices();

export default class CartController extends Controllers {
  constructor() {
    super(cartService);
  }

  addProdToCart = async (req, res, next) => {
    try {
      //const { cid } = req.params;
      const { cart } = req.user;
      const { pid } = req.params;
      const newProdToUserCart = await cartService.addProdToCart(
        cart,
        pid,
      );
      if (!newProdToUserCart) {
        createResponse(res, 404, { msg: "El producto o el carrito no existe." });
      } else {
        createResponse(res, 200, newProdToUserCart);
      }
    } catch (error) {
      next(error.message);
    }
  };

  removeProdToCart = async (req, res, next) => {
    try {
      const { cart } = req.user;
      const { pid } = req.params;
      const delProdToUserCart = await cartService.removeProdToCart(
        cart,
        pid,
      );
      if (!delProdToUserCart) {
        createResponse(res, 404, { msg: "El producto o el carrito no existe." });
      }
      else {
        createResponse(res, 200, { msg: `El producto de id: ${pid} fue eliminado del carrito correctamente.` });
      }
    } catch (error) {
      next(error.message);
    }
  };

  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { cart } = req.user;
      const { pid } = req.params;
      const { quantity } = req.body;
      const updateProdQuantity = await cartService.updateProdQuantityToCart(
        cart,
        pid,
        quantity
      );
      if (!updateProdQuantity) {
        createResponse(res, 404, { msg: "Error actualizando la cantidad del producto al carrito." });
      } else {
        createResponse(res, 200, updateProdQuantity);
      }
    } catch (error) {
      next(error.message);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { cart } = req.user;
      const clearCart = await cartService.clearCart(
        cart,
      );
      if (!clearCart) {
        createResponse(res, 404, { msg: "Error vaciando el carrito." });
      } else {
        createResponse(res, 200, clearCart);
      }
    } catch (error) {
      next(error.message);
    }
  };
}
