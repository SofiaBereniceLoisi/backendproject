import { Router } from "express";
const userRouter = Router();
import { login, logout, infoSession, register } from "../controllers/userController.js";

const validateLogin = (req, res, next) => {
    if (req.session.info && req.session.info.loggedIn) {
        next();
    }
    else {
        res.send('no estas autorizado');
    }
};

userRouter.post('/login', login);
userRouter.post('/register', register)
userRouter.get('/info', validateLogin, infoSession);

userRouter.post('/logout', logout);

export default userRouter;