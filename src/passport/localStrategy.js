import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserService from '../services/userService.js';
import logger from "../config/logConfig.js";

const userService = new UserService();

const strategyConfig = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}

//logica del registro con passport
const register = async (req, email, password, done) => {
    try {
        const user = await userService.getByEmail(email);
        if (user) {
            return done(null, false, { message: 'El usuario ya existe' });
        } else {
            const newUser = await userService.register(req.body);
            return done(null, newUser);
        }
    } catch (error) {
        logger.error('Error registering user [Passport Local]: ', error);
        return done(null, false);
    }
}

//logica del login con passport
const login = async (req, email, password, done) => {
    try {
        const userLogin = await userService.login({ email, password });
        if (!userLogin) {
            return done(null, false, { msg: 'Error de autenticación' });
        } else if(userLogin.isGithub){
            return done(null, false, { msg: 'Autenticación solo a través de GitHub' });
        } else {
            return done(null, userLogin);
        }
    } catch (error) {
        logger.error('Error loging in [Passport Local]: ', error);
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
        const user = await userService.getById(id);
        return done(null, user)
    } catch (error) {
        return done(error)
    }

})