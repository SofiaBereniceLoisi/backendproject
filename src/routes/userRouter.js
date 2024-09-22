import { Router } from "express";
import UserController from "../controllers/userController.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import { validateEmail } from "../middlewares/validateEmail.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const userRouter = Router();
const userController = new UserController();

// localhost:8080/users/...
// Passport local --------
userRouter.post("/register", validateEmail, passport.authenticate('register'), userController.registerResponse);
userRouter.post("/login", userController.loginResponse);
userRouter.post('/logout', userController.logoutResponse);
userRouter.get('/private', isAuth, (req, res) => res.json({ msg: 'Ruta privada' }))
userRouter.get('/profile', isAuth, userController.profile);
userRouter.get('/', [isAuth, isAdmin], userController.showUserList);
userRouter.post('/premium/:uid', [isAuth, isAdmin], userController.changeUserRole);
userRouter.post('/admin/delete-inactive-users', [isAuth, isAdmin], userController.deleteInactiveUsers);
userRouter.post('/admin/:uid', [isAuth, isAdmin], userController.changeUserRoleToAdmin);
userRouter.post('/admin/delete-user/:uid', [isAuth, isAdmin], userController.deleteUser);

// Passport con github -----
// Ruta inicial:
userRouter.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));
// Ruta de callback
userRouter.get('/github-callback', passport.authenticate('github', {
    failureRedirect: '/login',
    // successRedirect: '/profile-github',
    passReqToCallback: true
}), userController.githubResponse);

// prueba para ver si se le asignó el cart al usuario ---------------
// import UserService from '../services/userService.js';
// const userService = new UserService();

// userRouter.get('/user/:id', async (req, res) => {
//     try {
//         const user = await userService.getUserById(req.params.id);
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