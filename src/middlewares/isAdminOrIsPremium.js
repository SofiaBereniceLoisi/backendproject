import { HttpResponse } from '../utils/httpResponse.js';
const httpResponse = new HttpResponse();

export const isAdminOrIsPremium = (req, res, next) => {
    try {
        const role = req.user.role;
console.log(role);

        if (role == 'premium' || role == 'admin') {
            return next();
        } else {
            return httpResponse.Forbidden(res,"Este endpoint es solo para usuarios premium o administradores");
        }
    } catch (error) {
        next(error);
    }
};