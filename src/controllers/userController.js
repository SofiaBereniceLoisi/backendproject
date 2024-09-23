import UserService from '../services/userService.js';
import Controllers from './mainController.js';
import { HttpResponse } from '../utils/httpResponse.js';
import { sendMailDeleteAccount, sendMailRegister } from '../services/mailingService.js';
import logger from '../config/logConfig.js';
import passport from 'passport';
import { isValidPassword } from '../utils/utils.js';

const httpResponse = new HttpResponse();
const userService = new UserService();

export default class UserController extends Controllers {
    constructor() {
        super(userService);
    }

    registerResponse = async (req, res, next) => {
        try {
            let id = null;
            if (req.session.passport && req.session.passport.user) {
                id = req.session.passport.user;
            }
            const user = await this.service.getById(id);
            const { first_name, email } = user;
            // Enviar correo de bienvenida
            if (user) {
                await sendMailRegister(first_name, email);
            }
            return res.redirect('/login');
        } catch (error) {
            next(error);
        }
    };

    loginResponse = async (req, res, next) => {
        try {
            passport.authenticate('login', (err, user, info) => {
                if (err) return next(err);

                if (!user) {
                    // Guardar el mensaje de error en la sesión para usarlo en la vista
                    req.session.messages = { error: info.message };
                    return res.redirect('/login');
                }

                req.logIn(user, async (err) => {
                    if (err) return next(err);
                    await userService.updateLastConnection(user._id);

                    const { first_name, last_name, email, role } = user;

                    logger.info(`LOGIN OK! Usuario: ${first_name} ${last_name}, Email: ${email}, Rol: ${role}`);
                    return res.redirect('/users/profile');
                });
            })(req, res, next);
        } catch (error) {
            next(error);
        }
    };

    logoutResponse = (req, res, next) => {
        req.logout(error => {
            if (error) {
                return next(error);
            }
            req.session.destroy();
            logger.info('LOGOUT OK!');
            res.redirect('/login');
        });
    };

    githubResponse = async (req, res, next) => {
        try {
            req.session.user = req.user;
            res.redirect('/users/profile');
        } catch (error) {
            next(error);
        }
    };

    profile = async (req, res, next) => {
        try {
            if (req.user) {
                const { _id } = req.user;
                const user = await this.service.getUserById(_id);

                res.render('profile', user);
            } else {
                return httpResponse.Unauthorized(res, 'Unauthorized');;
            }
        } catch (error) {
            next(error);
        }
    };

    changeUserRole = async (req, res, next) => {
        const { uid } = req.params;

        try {
            // Obtener el usuario por su ID
            const user = await userService.getById(uid);

            if (!user) {
                return httpResponse.NotFound(res, 'User not found');
            }

            // Cambiar el rol del usuario
            const newRole = user.role === 'user' ? 'premium' : 'user';
            user.role = newRole;

            // Guardar los cambios
            await userService.update(uid, user);

            return httpResponse.Ok(res, `User role changed to ${newRole}`);
        } catch (error) {
            next(error);
        }
    };

    changeUserRoleToAdmin = async (req, res, next) => {
        const { uid } = req.params;

        try {
            // Obtener el usuario por su ID
            const user = await userService.getById(uid);

            if (!user) {
                return httpResponse.NotFound(res, 'User not found');
            }

            // Cambiar el rol del usuario a administrador
            const newRole = 'admin';
            user.role = newRole;

            // Guardar los cambios
            await userService.update(uid, user);

            return httpResponse.Ok(res, `User role changed to ${newRole}`);
        } catch (error) {
            next(error);
        }
    };

    deleteInactiveUsers = async (req, res, next) => {
        try {
            const inactivityLimit = new Date(Date.now() - 30 * 60 * 1000); // 30 minutos de inactividad
            const inactiveUsers = await userService.getInactiveUsers(inactivityLimit);

            if (!inactiveUsers || inactiveUsers.length === 0) {
                return httpResponse.Ok(res, 'No users to delete');
            }

            for (const user of inactiveUsers) {
                if (user.role !== 'admin') {
                    await userService.deleteUser(user._id);
                    await sendMailDeleteAccount(user.first_name, user.email);
                }
            }

            return httpResponse.Ok(res, `${inactiveUsers.length} users deleted due to inactivity`);
        } catch (error) {
            next(error);
        }
    };

    showUserList = async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();
            res.render('usersList', { users });
        } catch (error) {
            next(error);
        }
    };

    deleteUser = async (req, res, next) => {
        try {
            const { uid } = req.params;
            await userService.deleteUser(uid);
            res.redirect('/users');
        } catch (error) {
            next(error);
        }
    };
}
