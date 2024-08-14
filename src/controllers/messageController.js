import * as service from "../services/messageService.js";
import { HttpResponse } from '../utils/httpResponse.js';

const httpResponse = new HttpResponse();

export const getAllMessages = async (req, res, next) => {
    try {
        const response = await service.getAllMessages();
        return httpResponse.Ok(res,response);
    } catch (error) {
        next(error);
    }
}

export const createMessage = async (req, res, next) => {
    try {
        const newMessage = await service.createMessage(req.body);
        if (!newMessage) {
            return httpResponse.BadRequest(res,"No se pudo mandar el mensaje.");
        } else {
            return httpResponse.Created(res,newMessage);
        }
    } catch (error) {
        next(error);
    }
}