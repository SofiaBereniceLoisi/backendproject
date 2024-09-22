import logger from "../../../config/logConfig.js";
import { CartModel } from "./models/cartModel.js";
import { UserModel } from "./models/usersModel.js";
import MongoDao from "./mongoDAO.js";

export default class UserManager extends MongoDao {
    constructor() {
        super(UserModel);
    }

    getAll = async () => {
        try {
            return await this.model.find(); // Devuelve todos los usuarios
        } catch (error) {
            throw new Error(`Error fetching all users: ${error.message}`);
        }
    }

    register = async (user) => {
        try {
            const { email } = user;
            const existUser = await this.model.findOne({ email }); //trae el doc del user o null
            if (!existUser) {
                const newCart = await CartModel.create({});
                //si el user no existe lo crea
                //crea ademas un carrito asociado al nuevo usuario
                return await this.model.create({
                    ...user,
                    cart: newCart._id 
                });
            } else {
                return null;
            }
        } catch (error) {
            logger.error('Error registering new user: ', error);
            throw new Error(error)
        }
    };

    getById = async (id) => {
        try {
            return await this.model.findById(id).populate('cart');
        } catch (error) {
            logger.error('Error getting user by id: ', error);
            throw new Error(error);
        }
    }

    getByEmail = async (email) => {
        try {
            return await this.model.findOne({ email }).populate('cart');
        } catch (error) {
            logger.error('Error getting user by mail: ', error);
            throw new Error(error);
        }
    }

    getUsersByLastConnection = async (inactivityLimit) => {
        try {
            return await this.model.find({
                last_connection: { $lt: inactivityLimit }
            });
        } catch (error) {
            throw new Error(`Error fetching users by last connection: ${error.message}`);
        }
    }

    async deleteUser(userId) {
        try {
            return await this.model.findByIdAndDelete(userId);
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}