import { CartModel } from "./models/cartModel.js";
import MongoDao from "./mongoDAO.js";

export default class CartManagerM extends MongoDao {

  constructor() {
    super(CartModel);
  }

  create = async () => {
    try {
      return await this.model.create({
        products: [], //por default que se cree el carrito vacío.
      });
    } catch (error) {
      console.log(error);
    }
  }

  getAll = async () => {
    try {
      return await this.model.find({});
    } catch (error) {
      console.log(error);
    }
  }

  getById = async (id) => {
    try {
      return await this.model.findById(id).populate("products.product"); // trae los datos del prod en la coleccion de prods
    } catch (error) {
      console.log(error);
    }
  }

  addProdToCart = async (cartId, prodId, quantity) => {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        return null;
      }
      // busco si existe el prod en el carrito
      const existProdIndex = cart.products.findIndex(p => p.product.toString() === prodId);

      if (existProdIndex !== -1) {
        //si el prod existe en el carrito
        cart.products[existProdIndex].quantity = quantity;
      } else cart.products.push({ product: prodId, quantity });

      await cart.save();

      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  existProdInCart = async (cartId, prodId) => {
    try {
      return await this.model.findOne({
        _id: cartId,
        products: { $elemMatch: { product: prodId } }
      })
    } catch (error) {
      throw new Error(error);
    }
  }

  removeProdToCart = async (cartId, prodId) => {
    try {
      return await this.model.findOneAndUpdate(
        { _id: cartId },
        { $pull: { products: { product: prodId } } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  updateProdQuantityToCart = async (cartId, prodId, quantity) => {
    try {
      return await this.model.findOneAndUpdate(
        { _id: cartId, 'products.product': prodId },
        { $set: { 'products.$.quantity': quantity } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  }

  clearCart = async (cartId) => {
    try {
      return await this.model.findByIdAndUpdate(
        cartId,
        { $set: { products: [] } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  }
}