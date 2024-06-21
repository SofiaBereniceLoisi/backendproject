import * as services from '../services/userService.js';

export const registerResponse = (req, res, next) => {
    try {
        res.redirect('/login');
    } catch (error) {
        next(error);
    }
};

export const loginResponse = async (req, res, next) => {
    try {
        let id = null;
        if (req.session.passport && req.session.passport.user) {
            id = req.session.passport.user;
        }
        const user = await services.getUserById(id);
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

export const logoutResponse = (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        req.session.destroy();
        console.log('Se cerró sesión exitosamente')
        res.redirect('/login');
    });
};
