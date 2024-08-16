import UserService from '../services/userService.js';
import Controllers from './mainController.js';
import { HttpResponse } from '../utils/httpResponse.js';
import { sendMailGMail } from './emailController.js';

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
                await sendMailGMail(first_name, email);
            }
            return res.redirect('/login');
        } catch (error) {
            next(error);
        }
    };

    loginResponse = async (req, res, next) => {
        try {
            let id = null;
            if (req.session.passport && req.session.passport.user) {
                id = req.session.passport.user;
            }
            const user = await this.service.getById(id);
            if (!user) {
                return httpResponse.Unauthorized(res, 'Error de autenticacion');
            } else {
                const { first_name, last_name, email, role } = user;
                res.redirect('/users/profile');
                logger.info(`LOGIN OK! Usuario: ${first_name} ${last_name}, Email: ${email}, Rol: ${role}`);  
            }
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
