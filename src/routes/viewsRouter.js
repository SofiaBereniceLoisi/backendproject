import { Router } from "express";
const viewsRouter = Router();
import ProductManager from '../productManager.js';

const productsManager = new ProductManager('./data/products.json');

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productsManager.getProducts();
        res.render('realTimeProducts', { products });
    } catch (error) {
        console.log('Error al obtener los productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

export default viewsRouter;