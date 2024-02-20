import express from 'express';

// IMPORT ROUTES
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import mainRouter from './routes/mainRouter.js';

const app = express();
const port = 8080;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use(mainRouter);
app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);

app.listen(port, () => { console.log(`Servidor escuchando en el puerto ${port}`); });