import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as services from '../services/userService.js';

const strategyConfig = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}

//logica del registro con passport
const register = async (req, email, password, done) => {
    try {
        const user = await services.getUserByEmail(email);
        if (user) {
            return done(null, false, { message: 'El usuario ya existe' });
        } else {
            const newUser = await services.register(req.body);
            return done(null, newUser);
        }
    } catch (error) {
        console.log('Error en registro:', error);
        return done(null, false);
    }
}

//logica del login con passport
const login = async (req, email, password, done) => {
    try {
        const userLogin = await services.login({ email, password });
        if (!userLogin) {
            return done(null, false, { msg: 'Error de autenticación' });
        } else {
            return done(null, userLogin);
        }
    } catch (error) {
        console.log('Error en inicio de sesión:', error);
        return done(error);
    }

}

//constructor de las estrategias:
const registerStrategy = new LocalStrategy(strategyConfig, register);
const loginStrategy = new LocalStrategy(strategyConfig, login);

//inicializar la estrategia:
passport.use('register', registerStrategy);
passport.use('login', loginStrategy);

//agarra el usuario y lo mete en req.session.passport.user = id del usuario de mongo
passport.serializeUser((user, done) => {
    done(null, user._id); //guarda solo id para despues acceder al user con el id desde deserialize.
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await services.getUserById(id);
        return done(null, user)
    } catch (error) {
        return done(error)
    }

})