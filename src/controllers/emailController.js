import { transporter } from '../services/emailService.js';
import config from '../config.js';

export const sendMailGMail = async (userName,userEmail) => {
    try {
        const mailOptionsGMail = {
            from: config.EMAIL,
            to: userEmail,
            subject: 'Bienvenido/a',
            html: `<h1>Bienvenido/a, ${userName}</h1><p>Gracias por registrarte en nuestra aplicación.</p>`
        }
        const response = await transporter.sendMail(mailOptionsGMail);
        console.log('email enviado!');
        return response;
    } catch (error) {
        console.log(error);
    }
};
