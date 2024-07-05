import { Router } from "express";

// IMPORT ROUTES
import productsRouter from './productsRouter.js';
import cartRouter from './cartRouter.js';
import mainRouter from './mainRouter.js';
import viewsRouter from './viewsRouter.js';
import messageRouterM from './messageRouter.js';
import userRouter from './userRouter.js';

const router = Router();

// ROUTES
router.use('/api/carts', cartRouter);
router.use('/api/products', productsRouter);
router.use('/', viewsRouter);
router.use('/chat', messageRouterM);
router.use('/users', userRouter);
router.use(mainRouter);

export default router;