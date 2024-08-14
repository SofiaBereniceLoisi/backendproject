import 'dotenv/config';

export default {
    MONGO_URL: process.env.MONGO_URL,
    PERSISTENCE: process.env.PERSISTENCE,
    SESSION_KEY: process.env.SESSION_KEY,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CALLBACK_URL: process.env.CALLBACK_URL,
    EMAIL_ADMIN: process.env.EMAIL_ADMIN,
    PASSWORD_ADMIN: process.env.PASSWORD_ADMIN,
    PORT: process.env.PORT,
    
    HOST: process.env.HOST,
    PORT_ETHEREAL: process.env.PORT_ETHEREAL,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD
}