import { Router } from "express";
import { registerResponse, loginResponse, logoutResponse } from "../controllers/userController.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";

const userRouter = Router();



userRouter.post("/register", passport.authenticate('register'), registerResponse);
userRouter.post("/login", passport.authenticate('login'), loginResponse);
userRouter.post('/logout', logoutResponse);
userRouter.get('/private', isAuth, (req, res) => res.json({ msg: 'Ruta privada' }))

export default userRouter;