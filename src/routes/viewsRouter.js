import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import logger from "../config/logConfig.js";
import { HttpResponse } from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();
const viewsRouter = Router();

//localhost:8080/...

viewsRouter.get('/realtimeproducts', [isAuth, isAdmin], async (req, res) => {
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

// viewsRouter.get("/profile", isAuth, (req, res) => {
//     // console.log("req.user", req.user);
//     const { first_name, last_name, email, age, role } = req.user.toObject();
//     res.render("profile", {
//         first_name,
//         last_name,
//         email,
//         age,
//         role
//     });
// });


export default viewsRouter;