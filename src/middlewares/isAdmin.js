import { createResponse } from "../utils.js";

export const isAdmin = (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== 'admin') {
            createResponse(res, 401, 'Este endpoint es solo para administradores');
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};