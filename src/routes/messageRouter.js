import { Router } from "express";

// Controllers del chat de MongoDB
import * as controllersMsg from "../controllers/messageController.js";

const messageRouterM = Router();

// -------------- ENDPOINTS para msg del chat MONGO DB -------------------------------------------------------------------------

messageRouterM.get("/", controllersMsg.getAllMessages);

messageRouterM.post("/", controllersMsg.createMessage);

export default messageRouterM;