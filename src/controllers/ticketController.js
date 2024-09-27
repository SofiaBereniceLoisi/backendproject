import Controllers from "./mainController.js";
import TicketService from "../services/ticketService.js";
import { HttpResponse } from '../utils/httpResponse.js';
const httpResponse = new HttpResponse();
const ticketService = new TicketService();

export default class TicketController extends Controllers {
    constructor() {
        super(ticketService);
    }

    generateTicket = async (req, res, next) => {
        try {
            const user = req.user;
            const ticket = await ticketService.generateTicket(user);
            if (!ticket) {
                return httpResponse.NotFound(res,"Error generando ticket.");
            } else {
                res.redirect(`/ticket/purchase/${ticket._id}`);
                // return httpResponse.Ok(res,ticket);
            }
        } catch (error) {
            next(error);
        }
    };

    getTicketById = async (req, res, next) => {
        try {
            const { id } = req.params;  
            const ticket = await ticketService.getTicketById(id);  
            if (!ticket) {
                return httpResponse.NotFound(res, "Ticket no encontrado.");
            }
            const ticketData = {
                _id: ticket._id,
                code: ticket.code,
                purchase_datetime: ticket.purchase_datetime,
                amount: ticket.amount,
                purchaser: ticket.purchaser,
                products: ticket.products.map(product => ({
                    title: product.title,
                    quantity: product.quantity,
                    subtotal: product.subtotal
                })),
            };
            res.render('ticket', { ticketData });
        } catch (error) {
            next(error);
        }
    }
}