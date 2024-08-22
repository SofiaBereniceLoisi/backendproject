import UserService from '../services/userService.js';
import Controllers from './mainController.js';
import { HttpResponse } from '../utils/httpResponse.js';
import { sendMailRegister } from './mailingController.js';
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

                req.logIn(user, (err) => {
                    if (err) return next(err);
                    const { first_name, last_name, email, role } = user;
                    // Log de éxito
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

}
