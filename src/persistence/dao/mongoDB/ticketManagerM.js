import MongoDao from "./mongoDAO.js";
import { TicketModel } from "./models/ticketModel.js";

export default class TicketManager extends MongoDao {
    constructor() {
        super(TicketModel);
    }
};