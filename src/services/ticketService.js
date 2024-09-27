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

    generateTicket = async (user) =>{
        try {
            const cart = await cartService.getById(user.cart);
            if (!cart) {
                return null;
            }
            
            const products = [];
            let totalAmount = 0;
            if (cart.products.length > 0) {
                for (const prodInCart of cart.products) {
                    const idProd = prodInCart.product;
                    const prodDB = await prodService.getById(idProd);

                    if (prodInCart.quantity <= prodDB.stock) {
                        const subtotal = prodInCart.quantity * prodDB.price;
                        totalAmount += subtotal;
                        products.push({
                            title: prodDB.title,
                            quantity: prodInCart.quantity,
                            subtotal: subtotal
                        });
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
                products:products
            });

            await cartService.clearCart(user.cart);

            return ticket;
        } catch (error) {
            throw new Error(error);
        }
    };

    getTicketById = async (id) =>{
        try {
            return await this.dao.getById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}