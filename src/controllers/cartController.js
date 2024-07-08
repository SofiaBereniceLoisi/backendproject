import CartServices from '../services/cartService.js';
import Controllers from './mainController.js';

const cartService = new CartServices();

export default class CartController extends Controllers {
  constructor() {
    super(cartService);
  }

  addProdToCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      const newProdToUserCart = await cartService.addProdToCart(
        cid,
        pid,
      );
      if (!newProdToUserCart) res.json({ msg: "El producto o el carrito no existe." });
      else res.json(newProdToUserCart);
    } catch (error) {
      next(error.message);
    }
  };

  removeProdToCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      const delProdToUserCart = await cartService.removeProdToCart(
        cid,
        pid,
      );
      if (!delProdToUserCart) res.json({ msg: "El producto o el carrito no existe." });
      else res.json({ msg: `El producto de id: ${pid} fue eliminado del carrito correctamente.` });
    } catch (error) {
      next(error.message);
    }
  };

  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      const { quantity } = req.body;
      const updateProdQuantity = await cartService.updateProdQuantityToCart(
        cid,
        pid,
        quantity
      );
      if (!updateProdQuantity) res.json({ msg: "Error actualizando la cantidad del producto al carrito." });
      else res.json(updateProdQuantity);
    } catch (error) {
      next(error.message);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const clearCart = await cartService.clearCart(
        cid,
      );
      if (!clearCart) res.json({ msg: "Error vaciando el carrito." });
      else res.json(clearCart);
    } catch (error) {
      next(error.message);
    }
  };
}

// export const remove = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const cartDeleted = await service.remove(id);
//     if (!cartDeleted) res.status(404).json({ msg: "Error eliminando el carrito." });
//     else res.status(200).json({ msg: `Carrito de id: ${id} eliminado correctamente.` });
//   } catch (error) {
//     next(error.message);
//   }
// };

// export const addProdToCart = async (req, res, next) => {
//   try {
//     const { cid } = req.params;
//     const { pid } = req.params;
//     const newProdToUserCart = await service.addProdToCart(
//       cid,
//       pid,
//     );
//     if (!newProdToUserCart) res.json({ msg: "El producto o el carrito no existe." });
//     else res.json(newProdToUserCart);
//   } catch (error) {
//     next(error.message);
//   }
// };

// export const removeProdToCart = async (req, res, next) => {
//   try {
//     const { cid } = req.params;
//     const { pid } = req.params;
//     const delProdToUserCart = await service.removeProdToCart(
//       cid,
//       pid,
//     );
//     if (!delProdToUserCart) res.json({ msg: "El producto o el carrito no existe." });
//     else res.json({ msg: `El producto de id: ${pid} fue eliminado del carrito correctamente.` });
//   } catch (error) {
//     next(error.message);
//   }
// };

// export const updateProdQuantityToCart = async (req, res, next) => {
//   try {
//     const { cid } = req.params;
//     const { pid } = req.params;
//     const { quantity } = req.body;
//     const updateProdQuantity = await service.updateProdQuantityToCart(
//       cid,
//       pid,
//       quantity
//     );
//     if (!updateProdQuantity) res.json({ msg: "Error actualizando la cantidad del producto al carrito." });
//     else res.json(updateProdQuantity);
//   } catch (error) {
//     next(error.message);
//   }
// };

// export const clearCart = async (req, res, next) => {
//   try {
//     const { cid } = req.params;
//     const clearCart = await service.clearCart(
//       cid,
//     );
//     if (!clearCart) res.json({ msg: "Error vaciando el carrito." });
//     else res.json(clearCart);
//   } catch (error) {
//     next(error.message);
//   }
// };