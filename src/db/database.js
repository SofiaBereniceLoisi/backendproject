import mongoose from "mongoose";
import "dotenv/config";

//conexion a mongo atlas: string de conexion (en mongo atlas/drivers)
const MONGO_URL = process.env.MONGO_URL;

export const initMongoDB = async () => {
    try {
        //mongoose.set('strictQuery', false);
        await mongoose.connect(MONGO_URL);
        console.log("Conectado a MongoDB!");
    } catch (error) {
        console.log(error);
    }
};