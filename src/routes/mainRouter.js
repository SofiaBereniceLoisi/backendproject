import { Router } from "express";
import ProductManager from '../productManager.js'; // Importa el gestor de productos

const mainRouter = Router();
const productsManager = new ProductManager('./data/products.json'); // Crea una instancia del gestor de productos

mainRouter.get('/', async (req, res) => {
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

export default mainRouter;