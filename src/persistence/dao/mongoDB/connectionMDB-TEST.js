import mongoose from "mongoose";
import config from "../../../config/config.js";
import logger from "../../../config/logConfig.js";

//conexion a mongo TEST
const MONGO_URL_TEST = config.MONGO_URL_TEST;

export const initMongoDBTEST = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGO_URL_TEST);
        logger.info("Conectado a MongoDB TEST");
    } catch (error) {
        logger.error(`Error conectando a MongoDB TEST: ${error.message}`);
    }
};