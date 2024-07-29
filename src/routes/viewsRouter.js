import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
const viewsRouter = Router();

//localhost:8080/...

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        res.render('realTimeProducts');
    } catch (error) {
        console.log('Error al obtener los productos:', error);
        res.status(500).send('Error interno del servidor');
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

viewsRouter.get("/profile", isAuth, (req, res) => {
    // console.log("req.user", req.user);
    const { first_name, last_name, email, age, role } = req.user.toObject();
    res.render("profile", {
        first_name,
        last_name,
        email,
        age,
        role
    });
});

// viewsRouter.get('/profile', isAuth, (req, res) => {
//     const { first_name, last_name, email, age, role } = req.user;
//     res.render('profile', {
//         first_name,
//         last_name,
//         email,
//         age,
//         role
//     });
// });


export default viewsRouter;