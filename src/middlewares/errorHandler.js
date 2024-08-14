import { HttpResponse } from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();


export const errorHandler = (error, req, res, next) => {
    console.log(`error ${error}`);
    return httpResponse.InternalServerError(res, error.message);
};