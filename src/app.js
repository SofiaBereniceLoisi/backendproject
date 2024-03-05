import express from 'express';
import Handlebars from 'express-handlebars';
import __dirname from './utils.js';
import websocketManager from './websocketManager.js';

// IMPORT ROUTES
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import mainRouter from './routes/mainRouter.js';
import viewsRouter from './routes/viewsRouter.js';

const app = express();
const port = 8080;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`))

// Carpeta vistas y motor de plantillas
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.engine('handlebars', Handlebars.engine())

// ROUTES
app.use(mainRouter);
app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);
app.use(viewsRouter);

// HTTP Server
const server = app.listen(port, () => { console.log(`Servidor escuchando en el puerto ${port}`); });

const io = websocketManager(server);
app.set('io', io);