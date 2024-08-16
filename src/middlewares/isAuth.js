import logger from "../config/logConfig.js";

export const isAuth = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(403).redirect('/login');
            logger.warning('Intento de acceso no autorizado.');
        }
};