import { Router } from "express";
const viewsRouter = Router();
// import ProductManager from '../productManager.js';
// const productsManager = new ProductManager('./data/products.json');

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        res.render('realTimeProducts');
    } catch (error) {
        console.log('Error al obtener los productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// viewsRouter.post('/realtimeproducts/addProduct', async (req, res) => {
//     try {
//         const { title, description, price, stock, code, category } = req.body;
//         let newProduct = await productsManager.addProduct(title, description, price, code, stock, category);

//         if (newProduct) {   
//             // Obtener la lista actualizada de productos y enviarla al cliente
//             let updatedProducts = await productsManager.getProducts();
//            res.render('realTimeProducts', { updatedProducts }); 
//             res.status(200).send({ message: 'Producto agregado correctamente', products: updatedProducts });
//         } else {
//             res.status(500).send({ error: 'Error al agregar el producto' });
//         }
//     } catch (error) {
//         console.error('Error al agregar producto:', error);
//         res.status(500).send({ error: 'Error interno del servidor' });
//     }
// });

export default viewsRouter;