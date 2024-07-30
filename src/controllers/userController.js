import UserService from '../services/userService.js';
import Controllers from './mainController.js';

const userService = new UserService();

export default class UserController extends Controllers {
    constructor() {
        super(userService);
    }

    registerResponse = async (req, res, next) => {
        try {
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
                res.status(401).json({ msg: 'Error de autenticacion' });
            } else {
                const { first_name, last_name, email, age, role } = user;
                res.redirect('/users/profile');
                console.log({
                    msg: 'LOGIN OK!',
                    user: {
                        first_name,
                        last_name,
                        email,
                        age,
                        role
                    }
                })
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
            console.log('Se cerró sesión exitosamente')
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
                res.status(401).json({ msg: 'Unauthorized' });
            }
        } catch (error) {
            next(error);
        }
    };

}
