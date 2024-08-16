import { Router } from "express";
import logger from '../config/logConfig.js';
import { HttpResponse } from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();

const loggRouter = Router();

loggRouter.get('/loggerTest', async (req, res) => {
    try {
        logger.debug('Log Debug');
        logger.http('Log HTTP');
        logger.info('Log Info');
        logger.warning('Log Warning');
        logger.error('Log Error');
        logger.fatal('Log Fatal');
        res.json({
            message: 'Logger Test Complete',
        });
    } catch (error) {
        console.error('Error en /loggerTest:', error);
        return httpResponse.InternalServerError(res, 'Error al generar logs.');
    }
})

export default loggRouter;
