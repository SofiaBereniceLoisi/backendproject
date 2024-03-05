import { Router } from "express";

const mainRouter = Router();

import ProductManager from '../productManager.js'; 
const productsManager = new ProductManager('./data/products.json'); 

mainRouter.get('/', async (req, res) => {
    try {
        const products = await productsManager.getProducts();
        res.render('home', { products: products });
    } catch (error) {
        console.log('Error al obtener productos:', error);
        res.status(500).send({ error: 'Error al obtener productos' });
    }
});


export default mainRouter;