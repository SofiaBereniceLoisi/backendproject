import { Router } from "express";
import { registerResponse, loginResponse, logoutResponse, githubResponse } from "../controllers/userController.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";

const userRouter = Router();


// localhost:8080/users/...
// Passport local --------
userRouter.post("/register", passport.authenticate('register'), registerResponse);
userRouter.post("/login", passport.authenticate('login'), loginResponse);
userRouter.post('/logout', logoutResponse);
userRouter.get('/private', isAuth, (req, res) => res.json({ msg: 'Ruta privada' }))

// Passport con github -----
// Ruta inicial:
userRouter.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));
// Ruta de callback
userRouter.get('/github-callback', passport.authenticate('github' , {
    failureRedirect: '/login',
    // successRedirect: '/profile-github',
    passReqToCallback: true
}), githubResponse);

export default userRouter;