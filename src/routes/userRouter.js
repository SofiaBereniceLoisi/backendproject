import { Router } from "express";
import UserController from "../controllers/userController.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import { validateEmail } from "../middlewares/validateEmail.js";

const userRouter = Router();
const userController = new UserController();

// localhost:8080/users/...
// Passport local --------
userRouter.post("/register", validateEmail, passport.authenticate('register'), userController.registerResponse);
userRouter.post("/login", passport.authenticate('login'), userController.loginResponse);
userRouter.post('/logout', userController.logoutResponse);
userRouter.get('/private', isAuth, (req, res) => res.json({ msg: 'Ruta privada' }))

// Passport con github -----
// Ruta inicial:
userRouter.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));
// Ruta de callback
userRouter.get('/github-callback', passport.authenticate('github' , {
    failureRedirect: '/login',
    // successRedirect: '/profile-github',
    passReqToCallback: true
}), userController.githubResponse);

// prueba para ver si se le asignó el cart al usuario ---------------
// userRouter.get('/user/:id', async (req, res) => {
//     try {
//         const user = await services.getUserById(req.params.id);
//         if (user) {
//             res.status(200).json(user);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

export default userRouter;