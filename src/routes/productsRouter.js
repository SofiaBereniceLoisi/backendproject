import { Router } from "express";
const productsRouter = Router();

import ProductManager from '../productManager.js';
const productsManager = new ProductManager('./data/products.json');

productsRouter.get('/api/products', async (req, res) => {
    try {
        const { limit } = req.query;
        let products = await productsManager.getProducts();

        if (limit) {
            products = products.slice(0, parseInt(limit));
        }

        res.send(JSON.stringify(products));

    } catch (error) {
        console.log('Error al obtener productos: ', error);
        res.status(500).send({ error: 'Error al obtener productos' });
    }
})

productsRouter.get('/api/products/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productsManager.getProductById(productId);

        if (product) {
            res.send(JSON.stringify(product));
        } else {
            res.status(404).send({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.log('Error al obtener producto:', error);
        res.status(500).send({ error: 'Error al obtener producto' });
    }

})

productsRouter.post("/api/products/", async (req, res) => {
    try {
        const { title, description, price, code, stock, status, category, thumbnails } = req.body;
        const addedProduct = await productsManager.addProduct(title, description, price, code, stock, status, category, thumbnails);

        res.status(201).send(addedProduct);

    } catch (error) {
        console.log('Error al agregar producto:', error);
        res.status(500).send({ error: 'Error al agregar producto' });
    }

})

productsRouter.put("/api/products/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedFields = req.body;

        const updatedProduct = await productsManager.updateProduct(productId, updatedFields);

        if (updatedProduct) {
            res.status(200).send({ success: "Producto actualizado correctamente", product: updatedProduct });
        } else {
            res.status(404).send({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.log("Error al actualizar producto:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});

productsRouter.delete("/api/products/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);

        const deletedProduct = await productsManager.deleteProduct(productId);

        if (deletedProduct) {
            res.status(200).send({ success: "Producto eliminado correctamente" });
        } else {
            res.status(404).send({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.log("Error al eliminar producto:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});

export default productsRouter;