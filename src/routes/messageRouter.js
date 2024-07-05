import { Router } from "express";

// Controllers del chat de MongoDB
import * as controllersMsg from "../controllers/messageController.js";

const messageRouterM = Router();

// -------------- ENDPOINTS para msg del chat MONGO DB -------------------------------------------------------------------------

messageRouterM.route('/')
    .get(controllersMsg.getAllMessages)
    .post(controllersMsg.createMessage)

export default messageRouterM;