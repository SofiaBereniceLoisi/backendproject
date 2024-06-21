
export const isAuth = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(403).redirect('/login');
            console.log('No se inició sesión.')
        }
};