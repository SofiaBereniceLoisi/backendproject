import Services from "./mainServices.js";
import CartServices from "./cartService.js";
import ProductService from "./productServices.js";
import TicketDaoMongo from "../persistence/dao/mongoDB/ticketManagerM.js";
import { v4 as uuidv4 } from 'uuid';

const ticketDao = new TicketDaoMongo();
const prodService = new ProductService();
const cartService = new CartServices();

export default class TicketService extends Services {
    constructor() {
        super(ticketDao);
    }

    async generateTicket(user) {
        try {
            const cart = await cartService.getById(user.cart);
            if (!cart) {
                return null;
            }

            let totalAmount = 0;
            if (cart.products.length > 0) {
                for (const prodInCart of cart.products) {
                    const idProd = prodInCart.product;
                    const prodDB = await prodService.getById(idProd);

                    if (prodInCart.quantity <= prodDB.stock) {
                        const amount = prodInCart.quantity * prodDB.price;
                        totalAmount += amount;
                    } else {
                        return null;
                    }
                }
            }

            const ticket = await this.dao.create({
                code: uuidv4(),
                purchase_datetime: new Date().toLocaleString(),
                amount: totalAmount,
                purchaser: user.email,
            });

            await cartService.clearCart(user.cart);

            return ticket;
        } catch (error) {
            throw new Error(error);
        }
    }
}