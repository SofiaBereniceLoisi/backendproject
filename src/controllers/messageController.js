import * as service from "../services/messageService.js";

export const getAllMessages = async (req, res, next) => {
    try {
        const response = await service.getAllMessages();
        createResponse(res, 200, response);
    } catch (error) {
        next(error.message);
    }
}

export const createMessage = async (req, res, next) => {
    try {
        const newMessage = await service.createMessage(req.body);
        if (!newMessage) {
            createResponse(res, 404, { msg: 'No se pudo mandar el mensaje.' });
        } else {
            createResponse(res, 200, newMessage);
        }
    } catch (error) {
        next(error);
    }
}