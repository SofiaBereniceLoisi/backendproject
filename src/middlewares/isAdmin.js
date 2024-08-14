import { HttpResponse } from '../utils/httpResponse.js';
const httpResponse = new HttpResponse();

export const isAdmin = (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== 'admin') {
            return httpResponse.Forbidden(res,"Este endpoint es solo para administradores");
            //createResponse(res, 401, 'Este endpoint es solo para administradores');
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};