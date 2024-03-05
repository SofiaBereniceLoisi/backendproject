import { Router } from "express";
const viewsRouter = Router();

import ProductManager from '../productManager.js'; 
const productsManager = new ProductManager('./data/products.json'); 

viewsRouter.get('/', async (req, res) => {
    try {
        // Obtener la lista de productos
        const products = await productsManager.getProducts();
        // Renderizar la vista 'home' y pasar la lista de productos
        res.render('home', { products: products });
    } catch (error) {
        console.log('Error al obtener productos:', error);
        res.status(500).send({ error: 'Error al obtener productos' });
    }
});


export default viewsRouter;