import express from 'express';
import ProductManager from './productManager.js';
import CartManager from './cartManager.js';


const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsManager = new ProductManager('./data/products.json');
const cartsManager = new CartManager('./data/cart.json');

app.get('/', (req, res) => {
    res.send('Hola! Esta es la página de inicio de mi aplicación.');
});

app.get('/api/products', async (req, res) => {
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

app.get('/api/products/:pid', async (req, res) => {
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

app.post("/api/products/", async (req, res) => {
    try {
        const { title, description, price, code, stock, status, category, thumbnails } = req.body;
        const addedProduct = await productsManager.addProduct(title, description, price, code, stock, status, category, thumbnails);

        res.status(201).send(addedProduct);

    } catch (error) {
        console.log('Error al agregar producto:', error);
        res.status(500).send({ error: 'Error al agregar producto' });
    }

})

app.put("/api/products/:pid", async (req, res) => {
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

app.delete("/api/products/:pid", async (req, res) => {
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

app.post("/api/carts", async (req, res) => {
    try {
        const newCart = await cartsManager.createCart();
        if (newCart) {
            res.status(201).send({ success: "Nuevo carrito creado con exito", cart: newCart });
        } else {
            res.status(500).send({ error: "No se pudo crear el carrito" });
        }
    } catch (error) {
        console.log("Error al crear el carrito:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});

app.get("/api/carts/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartsManager.getCartById(cartId);
        if (cart) {
            res.status(200).send({ success: "Carrito encontrado", cart });
        } else {
            res.status(404).send({ error: "Carrito no encontrado" });
        }
    } catch (error) {
        console.log("Error al obtener el carrito:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});

app.post("/api/carts/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity || 1; //cantidad 1 por defecto si no se especifica.

        const updatedCart = await cartsManager.addProductToCart(cartId, productId, quantity);
        if (updatedCart) {
            res.status(200).send({ seccess: "Producto agregado al carrito correctamente", cart: updatedCart });
        } else {
            res.status(404).send({ error: "No se pudo agregar el producto al carrito: el carrito o el producto no existe." });
        }
    } catch (error) {
        console.log("Error al agregar el producto al carrito:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});