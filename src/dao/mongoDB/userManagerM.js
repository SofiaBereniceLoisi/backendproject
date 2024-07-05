import { CartModel } from "./models/cartModel.js";

export default class UserManager {
    constructor(model) {
        this.model = model;
    }

    async register(user) {
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
            throw new Error(error)
        }
    };

    async getById(id) {
        try {
            return await this.model.findById(id).populate('cart');
        } catch (error) {
            throw new Error(error);
        }
    }

    async getByEmail(email) {
        try {
            return await this.model.findOne({ email }).populate('cart');
        } catch (error) {
            throw new Error(error);
        }
    }
}