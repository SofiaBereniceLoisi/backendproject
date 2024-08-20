import { createTransport } from 'nodemailer';
import config from '../config/config.js';
import { __dirname } from '../utils/utils.js';

export const transporter = createTransport({
    service: 'gmail',
    port: config.PORT_GMAIL,
    secure: true,
    auth: {
        user: config.EMAIL,
        pass: config.PASSWORD
    }
});
