import { randomUUID } from "node:crypto";
import fs from 'fs';



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
}

export default CartManager;