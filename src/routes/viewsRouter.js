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

viewsRouter.get('/chat', async (req,res) => {
    res.render('chat');
})

viewsRouter.get('/login', async (req,res) => {
    res.render('formLogin');
})

viewsRouter.get('/signup', async (req,res) => {
    res.render('formSignup');
})

export default viewsRouter;