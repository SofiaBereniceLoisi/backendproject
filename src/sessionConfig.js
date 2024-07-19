import MongoStore from 'connect-mongo';
import config from './config.js';

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

export default storeConfig;