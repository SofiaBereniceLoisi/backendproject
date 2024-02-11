import express from 'express';
import productManager from './productManager.js';

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

const productsManager = new productManager('./products.json');

app.get('/', (req, res) => {
    res.send('Hola! Esta es la página de inicio de mi aplicación.');
});

app.get('/products', async (req, res) => {
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

app.get('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
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

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});