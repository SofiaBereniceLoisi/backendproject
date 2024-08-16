import { transporter } from '../services/emailService.js';
import config from '../config/config.js';
import logger from '../config/logConfig.js';

export const sendMailGMail = async (userName,userEmail) => {
    try {
        const mailOptionsGMail = {
            from: config.EMAIL,
            to: userEmail,
            subject: 'Bienvenido/a',
            html: `<h1>Bienvenido/a, ${userName}</h1><p>Gracias por registrarte en nuestra aplicación.</p>`
        }
        const response = await transporter.sendMail(mailOptionsGMail);
        logger.info('Email sent!');
        return response;
    } catch (error) {
        logger.error(`Error sending email: ${error.message}`);
    }
};
