import { Router } from "express";
const viewsRouter = Router();

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

viewsRouter.get('/login', async (req, res) => {
    res.render('login');
})

viewsRouter.get('/register', async (req, res) => {
    res.render('register');
})

viewsRouter.get("/profile", (req, res) => {
    console.log(req.session)
    res.render("profile",{
        first_name: req.session.first_name,
        last_name: req.session.last_name,
        email: req.session.email
    });
});


export default viewsRouter;