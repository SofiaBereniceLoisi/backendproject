import { Router } from "express";

// IMPORT ROUTES
import productsRouter from './productsRouter.js';
import cartRouter from './cartRouter.js';
import viewsRouter from './viewsRouter.js';
import messageRouterM from './messageRouter.js';
import userRouter from './userRouter.js';
// import emailRouter from './emailRouter.js';
import loggerTest from './loggerRouter.js';
import { isAuth } from "../middlewares/isAuth.js";
import ticketRouter from "./ticketRouter.js";

export default class MainRouter {
    constructor() {
        this.mainRouter = Router();
        this.init();

    }
    init() {
        // ROUTES
        this.mainRouter.use('/api/carts', cartRouter);
        this.mainRouter.use('/api/products', isAuth, productsRouter);
        this.mainRouter.use('/', viewsRouter);
        this.mainRouter.use('/chat', messageRouterM);
        this.mainRouter.use('/users', userRouter);
        this.mainRouter.use('/ticket' , ticketRouter);
        this.mainRouter.use('/test', loggerTest);
        this.mainRouter.use('*',(req, res) => {
            res.status(404).send({ error: 'La página que ingresaste no existe.' });
        })
    }

    getRouter(){
        return this.mainRouter;
    }
}
