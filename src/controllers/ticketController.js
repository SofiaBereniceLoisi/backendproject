import Controllers from "./mainController.js";
import TicketService from "../services/ticketService.js";
import { createResponse } from "../utils.js";
const ticketService = new TicketService();

export default class TicketController extends Controllers {
    constructor() {
        super(ticketService);
    }

    async generateTicket(req, res, next) {
        try {
            const user = req.user;
            const ticket = await ticketService.generateTicket(user);
            if (!ticket) {
                createResponse(res, 404, 'Error generando ticket');
            } else {
                createResponse(res, 200, ticket);
            }
        } catch (error) {
            next(error);
        }
    }
}