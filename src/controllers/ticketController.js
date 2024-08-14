import Controllers from "./mainController.js";
import TicketService from "../services/ticketService.js";
import { HttpResponse } from '../utils/httpResponse.js';
const httpResponse = new HttpResponse();
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
                return httpResponse.NotFound(res,"Error generando ticket.");
            } else {
                return httpResponse.Ok(res,ticket);
            }
        } catch (error) {
            next(error);
        }
    }
}