import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import UserService from '../services/userService.js';
import 'dotenv/config';

const userService = new UserService();

const strategyConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    try {
        // console.log(profile);
        const email = profile._json.email ?? ' ';
        const first_name = profile._json.name.split(' ')[0];
        const last_name = profile._json.name.split(' ').length === 3 ? profile._json.name.split(' ')[1].concat(' ', profile._json.name.split(' ')[2]) : profile._json.name.split(' ')[1];
        const user = await userService.getByEmail(email);
        if (user) {
            return done(null, user);
        } else {
            const newUser = await userService.register({
                first_name,
                last_name,
                email,
                password: ' ',
                isGithub: true
            });
            return done(null, newUser)
        }
    } catch (error) {
        return done(error);
    }
}

passport.use('github', new GithubStrategy(strategyConfig, registerOrLogin));