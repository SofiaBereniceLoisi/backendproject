import express, { json, urlencoded } from 'express';
import Handlebars from 'express-handlebars';
import { __dirname } from './utils/utils.js';
import { websocketManager } from './persistence/dao/mongoDB/websocketManager.js';
import { Server } from 'socket.io';
import { initMongoDB } from './persistence/dao/mongoDB/connectionMDB.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import storeConfig from './config/sessionConfig.js';
import passport from 'passport';
import config from './config/config.js';
import './passport/localStrategy.js';
import './passport/githubStrategy.js';
import compression from 'express-compression';

// IMPORT ROUTER
import MainRouter from './routes/mainRouter.js';
const mainRouter = new MainRouter();

const app = express();

// MIDDLEWARES
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../public`));
app.use(cookieParser());
app.use(session(storeConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(compression({brotli:{enabled:true,zlib:{}}}));
app.use(errorHandler);

// Carpeta vistas y motor de plantillas
app.set('view engine', 'handlebars');
app.engine('handlebars', Handlebars.engine());
app.set('views', `${__dirname}/../views`);

// ROUTES
app.use('/', mainRouter.getRouter());

// PERSISTENCIA EN MONGO 
if (config.PERSISTENCE === 'MONGO') {
    initMongoDB();
}

// HTTP Server
const httpServer = app.listen(config.PORT, () => { console.log(`Servidor escuchando en el puerto ${config.PORT}`); });

// Socket Server
const socketServer = new Server(httpServer);
websocketManager(socketServer);
