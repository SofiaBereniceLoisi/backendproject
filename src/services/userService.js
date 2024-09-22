import config from "../config/config.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import Services from "./mainServices.js";
import UsersToListDTO from '../persistence/dtos/usersDto.js';
import UserManager from "../persistence/dao/mongoDB/userManagerM.js";
import UserRepository from "../repository/userRepository.js";
import logger from "../config/logConfig.js";

const userRepository = new UserRepository();
const userDao = new UserManager();

export default class UserService extends Services {
    constructor() {
        super(userDao);
    }

    getAllUsers = async () => {
        try {
            const users = await this.dao.getAll(); 
            return users.map(user => new UsersToListDTO(user)); 
        } catch (error) {
            throw new Error('Error obteniendo usuarios');
        }
    } 

    getByEmail = async (email) => {
        try {
            return await this.dao.getByEmail(email);
        } catch (error) {
            throw new Error(error);
        }
    }

    getUserById = async (id) => {
        try {
            return await userRepository.getUserById(id);
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
            logger.info(user)
            const existUser = await this.dao.getByEmail(email);
            if (!existUser) {
                if (email === config.EMAIL_ADMIN && password === config.PASSWORD_ADMIN) {
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

     updatePassword = async(userId, newPassword) =>{
        try {
            return await this.dao.update(userId, { password: newPassword });
        } catch (error) {
            throw new Error(`Error al actualizar la contraseña: ${error.message}`);
        }
    }

    updateLastConnection = async (userId) => {
        try {
            return await this.dao.update(userId, { last_connection: new Date() });
        } catch (error) {
            throw new Error(`Error updating last connection: ${error.message}`);
        }
    }

    getInactiveUsers = async (inactivityLimit) => {
        try {
            return await this.dao.getUsersByLastConnection(inactivityLimit);
        } catch (error) {
            throw new Error(`Error fetching inactive users: ${error.message}`);
        }
    }

    deleteUser = async (userId) => {
        try {
            return await this.dao.deleteUser(userId);
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}
