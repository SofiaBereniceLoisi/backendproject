import { Router } from 'express';
import TicketController from '../controllers/ticketController.js';
import { isAuth } from '../middlewares/isAuth.js';
const ticketController = new TicketController();

const ticketRouter = Router();

ticketRouter.post('/purchase', [isAuth], ticketController.generateTicket);

export default ticketRouter;