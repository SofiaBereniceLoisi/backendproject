import CartServices from '../services/cartService.js';
import { HttpResponse } from '../utils/httpResponse.js';
import Controllers from './mainController.js';

const httpResponse = new HttpResponse();
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
      const userEmail = req.user.email; 

      const product = await productService.getById(pid);

      // Verifica si el producto existe
      if (!product) {
        return httpResponse.NotFound(res, "El producto no existe.");
      }

      if (req.user.role === 'premium' && product.owner === userEmail) {
        return httpResponse.Forbidden(res, "No puede agregar a su carrito un producto que le pertenece.");
      }

      const newProdToUserCart = await cartService.addProdToCart(cart, pid);
      if (!newProdToUserCart) {
        return httpResponse.NotFound(res,"El producto o el carrito no existe.");
      } else {
        return httpResponse.Ok(res,newProdToUserCart);
      }
    } catch (error) {
      next(error);
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
        return httpResponse.NotFound(res,"El producto o el carrito no existe.");
      }
      else {
        return httpResponse.Ok(res,`El producto de id: ${pid} fue eliminado del carrito correctamente.`);
      }
    } catch (error) {
      next(error);
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
        return httpResponse.BadRequest(res, 'Error actualizando la cantidad del producto al carrito.');
      } else {
        return httpResponse.Ok(res,updateProdQuantity);
      }
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { cart } = req.user;
      const clearCart = await cartService.clearCart(
        cart,
      );
      if (!clearCart) {
        return httpResponse.NotFound(res,"Error vaciando el carrito.");
      } else {
        return httpResponse.Ok(res,clearCart);
      }
    } catch (error) {
      next(error);
    }
  };
}
