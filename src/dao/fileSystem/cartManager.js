import { randomUUID } from "node:crypto";
import fs from 'fs';
import ProductManager from './productManager.js';

const productsManager = new ProductManager('./data/products.json');


class CartManager {
    constructor(cartPath) {
        this.cartPath = cartPath;
    }

    createCart() {
        try {
            let carts = JSON.parse(fs.readFileSync(this.cartPath, 'utf-8'));
            const ID = randomUUID();
            const cart = {
                id: ID,
                products: []
            };
            carts.push(cart);
            fs.writeFileSync(this.cartPath, JSON.stringify(carts, null, 2));
            console.log('Carrito creado exitosamente');
            return cart;
        } catch (error) {
            console.log('Error creando el carrito:', error);
            return null;
        }
    }

    getCartById = async (cartId) => {
        try {
            let carts = JSON.parse(fs.readFileSync(this.cartPath, 'utf-8'));
            const cart = carts.find(cart => cart.id === cartId);
            if (cart) {
                return cart;
            } else {
                console.log('Carrito no encontrado');
                return null;
            }
        } catch (error) {
            console.log('Error obteniendo el carrito:', error);
            return null;
        }
    }

    addProductToCart = async (cartId, productId, quantity) => {
        try {
            let carts = JSON.parse(fs.readFileSync(this.cartPath, 'utf-8'));
            const cart = carts.find(cart => cart.id === cartId);
    
            if (cart) {
                const productInCart = cart.products.find(product => product.productId === productId);
    
                if (productInCart) {
                    productInCart.quantity += quantity;
                } else {
                    const product = await productsManager.getProductById(productId);
                    if (product){
                        cart.products.push({ productId, quantity });
                    }else{
                        console.log ('El producto no existe');
                        return null;
                    }
                }
    
                fs.writeFileSync(this.cartPath, JSON.stringify(carts, null, 2));
                console.log('Producto agregado al carrito exitosamente');
                return cart;
            } else {
                console.log('Carrito no encontrado');
                return null;
            }
        } catch (error) {
            console.log('Error agregando producto al carrito:', error);
            return null;
        }
    }
}

export default CartManager;