import * as service from "../services/messageService.js";

export const getAllMessages = async (req, res, next) => {
    try {
        const response = await service.getAllMessages();
        res.json(response);
    } catch (error) {
        next(error.message);
    }
}

export const createMessage = async (req, res, next) => {
    try {
        const newMessage = await service.createMessage(req.body);
        if (!newMessage) {
            res.status(404).json({ msg: 'No se pudo mandar el mensaje.' });
        } else {
            res.json(newMessage);
        }
    } catch (error) {
        next(error);
    }
}