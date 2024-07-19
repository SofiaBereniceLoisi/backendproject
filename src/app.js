import express, { json, urlencoded } from 'express';
import Handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { websocketManager } from './websocketManager.js';
import { Server } from 'socket.io';
import { initMongoDB } from './dao/mongoDB/connectionMDB.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import config from './config.js';
import './passport/localStrategy.js';
import './passport/githubStrategy.js';

// IMPORT ROUTER
import MainRouter from './routes/mainRouter.js';
const mainRouter = new MainRouter();

const app = express();

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_URL,
        crypto: { secret: config.SECRET_KEY },
        ttl: 180,
    }),
    secret: config.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
};

// MIDDLEWARES
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(session(storeConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler);

// Carpeta vistas y motor de plantillas
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.engine('handlebars', Handlebars.engine());

// ROUTES
app.use('/', mainRouter.getRouter());

// PERSISTENCIA EN MONGO 
// Si se quiere cambiar la persistencia a fileSystem, cambiar en .env
if (config.PERSISTENCE === 'MONGO') {
    initMongoDB();
}

// HTTP Server
const httpServer = app.listen(config.PORT, () => { console.log(`Servidor escuchando en el puerto ${config.PORT}`); });

// Socket Server
const socketServer = new Server(httpServer);
websocketManager(socketServer);
