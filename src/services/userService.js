import UserManager from "../dao/mongoDB/userManagerM.js";
import { createHash, isValidPassword } from "../utils.js";
import Services from "./mainServices.js";
import 'dotenv/config';

const userDao = new UserManager();

export default class UserService extends Services {
    constructor() {
        super(userDao);
    }

    getByEmail = async (email) => {
        try {
            return await this.dao.getByEmail(email);
        } catch (error) {
            throw new Error(error);
        }
    }

    login = async (user) => {
        try {
            const { email, password } = user;
            const existUser = await this.dao.getByEmail(email);
            if (!existUser) {
                return null;
                //acá podría hacer que aparezca un modal/toastify diciendo que los datos ingresados son incorrectos.
            } else if (existUser.isGithub) {
                return null;
            } else {
                if (isValidPassword(password, existUser)) {
                    return existUser;
                } else {
                    return null;
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    register = async (user) => {
        try {
            const { email, password } = user;
            console.log(user)
            const existUser = await this.dao.getByEmail(email);
            if (!existUser) {
                if (email === process.env.EMAIL_ADMIN && password === process.env.PASSWORD_ADMIN) {
                    const newUser = await this.dao.register({
                        ...user,
                        password: createHash(password),
                        role: "admin",
                    });
                    return newUser;
                } else {
                    const newUser = await this.dao.register({
                        ...user,
                        password: createHash(password),
                    });
                    return newUser;
                }
            } else {
                return null;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
