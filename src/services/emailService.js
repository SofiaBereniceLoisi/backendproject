import { createTransport } from 'nodemailer';
import config from '../config.js';
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

// export const mailOptionsEthereal = {
//     from: config.EMAIL,
//     to: config.EMAIL,
//     subject: 'Bienvenido/a',
//     html: "<h1>Bienvenido<h1>"
// }
