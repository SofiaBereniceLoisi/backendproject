import winston, {transports} from "winston";

const logConfig = {
    transports: [new winston.transports.Console()]
};

const logger  = winston.createLogger(logConfig);

logger.level = 'debug';

logger.silly('log silly');
logger.debug('log debug');
logger.verbose('log verbose');
logger.info('log info');
logger.http('log http');
logger.warn('og warn');
logger.error('log error');

