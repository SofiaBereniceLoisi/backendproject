import { Router } from "express";
const mainRouter = Router();

mainRouter.get('/', (req, res) => {
    res.send('Hola! Esta es la página de inicio de mi aplicación.');
});

export default mainRouter;