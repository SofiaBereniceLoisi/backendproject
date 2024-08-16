import mongoose from "mongoose";
import config from "../../../config/config.js";
import logger from "../../../config/logConfig.js";

//conexion a mongo atlas: string de conexion (en mongo atlas/drivers)
const MONGO_URL = config.MONGO_URL;

export const initMongoDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGO_URL);
        logger.info("Conectado a MongoDB!");
    } catch (error) {
        logger.error(`Error conectando a MongoDB: ${error.message}`);
    }
};