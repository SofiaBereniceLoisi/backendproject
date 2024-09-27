import CartServices from '../services/cartService.js';
import ProductService from '../services/productServices.js';
const productService = new ProductService();
import { HttpResponse } from '../utils/httpResponse.js';
import Controllers from './mainController.js';

const httpResponse = new HttpResponse();
const cartService = new CartServices();

export default class CartController extends Controllers {
  constructor() {
    super(cartService);
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cart = await cartService.getById(id);
  
      if (!cart) {
        return httpResponse.NotFound(res, "El carrito no existe.");
      }
  
      if (cart.products && cart.products.length > 0) {
        const detailedProducts = await Promise.all(
          cart.products.map(async (cartItem) => {
            const productDetails = await productService.getById(cartItem.product);
  
            if (!productDetails) {
              throw new Error("Producto no encontrado");
            }
  
            // Convierte el objeto del producto en un objeto plano
            const productDetailsPlain = productDetails.toObject(); 
  
            const subtotal = productDetailsPlain.price * cartItem.quantity;
  
            return {
              product: productDetailsPlain, // Usa el objeto plano
              quantity: cartItem.quantity,
              subtotal: subtotal, // Añadimos el subtotal calculado aquí
            };
          })
        );
  
        // Calculamos el precio total del carrito
        const totalPrice = detailedProducts.reduce(
          (total, item) => total + item.subtotal, 0
        );
  
        const plainCart = {
          ...cart.toObject(), 
          products: detailedProducts,
          totalPrice: totalPrice 
        };
  
        res.render('cart', { cart: plainCart });
      } else {
        res.render('cart', { cart: [], message: "El carrito está vacío." });
      }
    } catch (error) {
      next(error);
    }
  };

  addProdToCart = async (req, res, next) => {
    try {
      //const { cid } = req.params;
      const { cart } = req.user;
      const { pid } = req.params;
      const userEmail = req.user.email;

      const product = await productService.getById(pid);

      if (!product) {
        return httpResponse.NotFound(res, "El producto no existe.");
      }

      if (req.user.role === 'premium' && product.owner === userEmail) {
        return httpResponse.Forbidden(res, "No puede agregar a su carrito un producto que le pertenece.");
      }

      const newProdToUserCart = await cartService.addProdToCart(cart, pid);
      if (!newProdToUserCart) {
        return httpResponse.NotFound(res, "El producto o el carrito no existe.");
      } else {
        return httpResponse.Ok(res, newProdToUserCart);
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
        return httpResponse.NotFound(res, "El producto o el carrito no existe.");
      }
      else {
        return httpResponse.Ok(res, `El producto de id: ${pid} fue eliminado del carrito correctamente.`);
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
        return httpResponse.Ok(res, updateProdQuantity);
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
        return httpResponse.NotFound(res, "Error vaciando el carrito.");
      } else {
        return httpResponse.Ok(res, clearCart);
      }
    } catch (error) {
      next(error);
    }
  };
}
