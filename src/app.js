import express from 'express';
import Handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';

// IMPORT ROUTES
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
// import mainRouter from './routes/mainRouter.js';
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
// app.use(mainRouter);
app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);
app.use(viewsRouter);

// HTTP Server
const server = app.listen(port, () => { console.log(`Servidor escuchando en el puerto ${port}`); });

// Websocket Server
const io = new Server(server); //socket.io

io.on('connection', (socket) => {

    console.log('Client connected!');

    socket.on('message', (data) => {
        console.log(data)
        // io.emit('log', data);

    })
})