import ProductManagerM from "../dao/mongoDB/productManagerM.js";
const productManagerM = new ProductManagerM();

import CartManagerM from "../dao/mongoDB/cartManagerM.js";
const cartManagerM = new CartManagerM();

export const getAll = async () => {
    try {
        return await cartManagerM.getAll();
    } catch (error) {
        console.log(error);
    }
};

export const getById = async (id) => {
    try {
        const cart = await cartManagerM.getById(id);
        if (!cart) {
            return false;
        }
        else {
            return cart;
        }
    } catch (error) {
        console.log(error);
    }
};

export const create = async () => {
    try {
        const newcart = await cartManagerM.create();
        if (!newcart) {
            return false;
        } else {
            return newcart;
        }
    } catch (error) {
        console.log(error);
    }
};

export const update = async (id, obj) => {
    try {
        const cartUpdated = await cartManagerM.update(id, obj);
        if (!cartUpdated) {
            return false;
        } else {
            return cartUpdated;
        }
    } catch (error) {
        console.log(error);
    }
};

export const remove = async (id) => {
    try {
        const cartDeleted = await cartManagerM.delete(id);
        if (!cartDeleted) {
            return false;
        } else {
            return cartDeleted;
        }
    } catch (error) {
        console.log(error);
    }
};

export const addProdToCart = async (cartId, prodId) => {
    try {
        const existCart = await getById(cartId);
        const existProd = await productManagerM.getById(prodId);
        if (!existCart || !existProd) {
            return null;
        }
        //verifico si el prod existe en el carrito
        const existProdInCart = await cartManagerM.existProdInCart(cartId, prodId);
        if (existProdInCart) {
            // si ya hay un mismo prod sumo 1 
            const quantity = existProdInCart.products.find(p => p.product.toString() === prodId).quantity + 1;
            return await cartManagerM.addProdToCart(cartId, prodId, quantity);
        }
        //si no existe en el carrito lo agrega
        return await cartManagerM.addProdToCart(cartId, prodId);
    } catch (error) {
        console.log(error);
    }
};

export const removeProdToCart = async (cartId, prodId) => {
    try {
        const existCart = await getById(cartId);
        const existProd = existCart.products.find(p => p.product._id.toString() === prodId);
        if (!existCart || !existProd) {
            return null;
        }
        return await cartManagerM.removeProdToCart(cartId, prodId);

    } catch (error) {
        console.log(error);
    }
};

export const updateProdQuantityToCart = async (cartId, prodId, quantity) => {
    try {
        const existCart = await getById(cartId);
        const existProd = existCart.products.find(p => p.product._id.toString() === prodId);
        if (!existCart || !existProd) {
            return null;
        }
        return await cartManagerM.updateProdQuantityToCart(cartId, prodId, quantity)
    } catch (error) {
        console.log(error);
    }
};

export const clearCart = async (cartId) => {
    try {
        const existCart = await getById(cartId);
        if (!existCart) {
            return null;
        }
        return cartManagerM.clearCart(cartId);
    } catch (error) {
        console.log(error);
    }
};