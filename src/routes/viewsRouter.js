import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import logger from "../config/logConfig.js";
import { HttpResponse } from "../utils/httpResponse.js";
import { renderResetPasswordView, handleMailToResetPass, handleResetPassword } from '../controllers/mailingController.js'
// import { isPremium } from "../middlewares/isPremium.js";
import { isAdminOrIsPremium } from "../middlewares/isAdminOrIsPremium.js";
const httpResponse = new HttpResponse();
const viewsRouter = Router();

//localhost:8080/...

viewsRouter.get('/realtimeproducts', [isAuth, isAdminOrIsPremium], async (req, res) => {
    try {
        res.render('realTimeProducts');
    } catch (error) {
        logger.fatal('Fatal error in /realtimeproducts: ', error);
        return httpResponse.InternalServerError(res, error)
    }
});

viewsRouter.get('/chat', async (req, res) => {
    res.render('chat');
})

viewsRouter.get('/', async (req, res) => {
    res.render('login');
})

viewsRouter.get('/login', async (req, res) => {
    res.render('login');
})

viewsRouter.get('/register', async (req, res) => {
    res.render('register');
})

viewsRouter.get('/mailtoresetpass', async (req, res) => {
    res.render('mailToResetPass');
});

// Enviar correo para restablecer la contraseña
viewsRouter.get('/resetPassword/:resetId', renderResetPasswordView);

// Enviar el correo para recuperación de contraseña
viewsRouter.post('/mailtoresetpass', handleMailToResetPass);

// Procesar el formulario de recuperación de contraseña
viewsRouter.post('/resetpassword', handleResetPassword);

export default viewsRouter;