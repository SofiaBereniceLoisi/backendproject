import mongoose from "mongoose";

//conexion a mongo atlas: string de conexion (drivers)
const MONGO_URL = "mongodb+srv://sofiabereniceloisi:admin@codercluster.ht8yuc3.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=CoderCluster";

export const initMongoDB = async () => {
try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URL);
    console.log("Conectado a MongoDB!");
} catch (error) {
    console.log(error);
}
};