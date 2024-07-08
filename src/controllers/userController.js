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
                res.redirect('/profile');
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
            res.redirect('/profile');
        } catch (error) {
            next(error);
        }
    }



}

// export const registerResponse = (req, res, next) => {
//     try {
//         res.redirect('/login');

//     } catch (error) {
//         next(error);
//     }
// };

// export const loginResponse = async (req, res, next) => {
//     try {
//         let id = null;
//         if (req.session.passport && req.session.passport.user) {
//             id = req.session.passport.user;
//         }
//         const user = await services.getUserById(id);
//         if (!user) {
//             res.status(401).json({ msg: 'Error de autenticacion' });
//         } else {
//             // const user = await services.getUserByEmail(req.session.passport.user);
//             const { first_name, last_name, email, age, role } = user;
//             res.redirect('/profile');
//             console.log({
//                 msg: 'LOGIN OK!',
//                 user: {
//                     first_name,
//                     last_name,
//                     email,
//                     age,
//                     role
//                 }
//             })
//         }
//     } catch (error) {
//         next(error);
//     }
// };

// export const logoutResponse = (req, res, next) => {
//     req.logout(err => {
//         if (err) {
//             return next(err);
//         }
//         req.session.destroy();
//         console.log('Se cerró sesión exitosamente')
//         res.redirect('/login');
//     });
// };

// export const githubResponse = async (req, res, next) => {
//     try {
//         req.session.user = req.user;
//         res.redirect('/profile');
//     } catch (error) {
//         next(error);
//     }
// }
