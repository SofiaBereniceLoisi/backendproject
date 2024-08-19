import winston, { format } from "winston";
import config from './config.js';

const levels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
};

const colors = {
    fatal: 'blue',
    error: 'red',
    warning: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'gray',
};

winston.addColors(colors);

// entorno
const env = config.NODE_ENV;

// Configuración del logger
const logger = winston.createLogger({
    levels, 
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((info) => `${info.level} | ${info.timestamp} | ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({
            level: env === 'development' ? 'debug' : 'info',
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        new winston.transports.File({
            filename: './src/logs/errors.log',
            level: 'error'
        }),
    ]
});

export default logger;