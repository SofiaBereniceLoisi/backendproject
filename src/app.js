import express from 'express';
import Handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { websocketManager } from './dao/fileSystem/websocketManager.js';
import { Server } from 'socket.io';
import { initMongoDB } from './dao/mongoDB/connectionMDB.js';
import 'dotenv/config';

// IMPORT ROUTES
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import mainRouter from './routes/mainRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import productsRouterM from './routes/productsRouterM.js';

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
app.use('/', viewsRouter);
app.use('/products', productsRouterM);

// PERSISTENCIA EN MONGO 
// Si se quiere cambiar la persistencia a fileSystem, cambiar en .env
if (process.env.PERSISTENCE === 'MONGO') {
    initMongoDB();
}

// HTTP Server
const httpServer = app.listen(port, () => { console.log(`Servidor escuchando en el puerto ${port}`); });

// Socket Server
const socketServer = new Server(httpServer);
websocketManager(socketServer);
