import ProductManagerM from "../persistence/dao/mongoDB/productManagerM.js";
const productDao = new ProductManagerM();

import CartManagerM from "../persistence/dao/mongoDB/cartManagerM.js";
const cartDao = new CartManagerM();

import Services from "./mainServices.js";

export default class CartServices extends Services {
    constructor() {
        super(cartDao)
    }

    addProdToCart = async (cartId, prodId) => {
        try {
            const existCart = await this.dao.getById(cartId);
            console.log( 'cart:' , existCart)
            const existProd = await productDao.getById(prodId);
            console.log('producto:' , existProd);
            if (!existCart || !existProd) {
                console.log("Cart or Product does not exist.");
                return null;
            }
            //verifico si el prod existe en el carrito
            const existProdInCart = await this.dao.existProdInCart(cartId, prodId);
            if (existProdInCart) {
                // si ya hay un mismo prod sumo 1 
                const quantity = existProdInCart.products.find(p => p.product.toString() === prodId).quantity + 1;
                return await this.dao.addProdToCart(cartId, prodId, quantity);
            }
            //si no existe en el carrito lo agrega
            return await this.dao.addProdToCart(cartId, prodId);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    removeProdToCart = async (cartId, prodId) => {
        try {
            const existCart = await this.dao.getById(cartId);
            const existProd = existCart.products.find(p => p.product._id.toString() === prodId);
            if (!existCart || !existProd) {
                return null;
            }
            return await this.dao.removeProdToCart(cartId, prodId);

        } catch (error) {
            console.log(error);
        }
    };

    updateProdQuantityToCart = async (cartId, prodId, quantity) => {
        try {
            const existCart = await this.dao.getById(cartId);
            const existProd = existCart.products.find(p => p.product._id.toString() === prodId);
            if (!existCart || !existProd) {
                return null;
            }
            return await this.dao.updateProdQuantityToCart(cartId, prodId, quantity)
        } catch (error) {
            console.log(error);
        }
    };

    clearCart = async (cartId) => {
        try {
            const existCart = await this.dao.getById(cartId);
            if (!existCart) {
                return null;
            }
            return this.dao.clearCart(cartId);
        } catch (error) {
            console.log(error);
        }
    };

}
