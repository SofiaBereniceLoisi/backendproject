import logger from "../config/logConfig.js";
import { HttpResponse } from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();


export const errorHandler = (error, req, res, next) => {
    logger.error(`Error: ${error.message}`);
    return httpResponse.InternalServerError(res, error.message);
};