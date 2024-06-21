
export const isAuth = (req, res, next) => {
    // console.log(req.session.passport.user);
    // if (req.session.passport && req.session.passport.user) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(403).redirect('/login');
            console.log('No se inició sesión.')
        }
    // }
};