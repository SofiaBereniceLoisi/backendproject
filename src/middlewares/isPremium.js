import { HttpResponse } from '../utils/httpResponse.js';
const httpResponse = new HttpResponse();

export const isPremium = (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== 'premium') {
            return httpResponse.Forbidden(res,"Este endpoint es solo para usuarios premium");
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};