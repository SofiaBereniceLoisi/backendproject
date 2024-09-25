import { createTransport } from 'nodemailer';
import config from '../config/config.js';
import logger from '../config/logConfig.js';

export const transporter = createTransport({
    service: 'gmail',
    port: config.PORT_GMAIL,
    secure: true,
    auth: {
        user: config.EMAIL,
        pass: config.PASSWORD
    }
});

export const sendResetPasswordEmail = async (userName, userEmail, resetId) => {
    try {
        const mailOptions = {
            from: config.EMAIL,
            to: userEmail,
            subject: 'Recuperación de contraseña',
            html: `<h1>Hola, ${userName}!</h1>
                   <p>Haz clic en el siguiente <a href='http://localhost:8080/resetPassword/${resetId}'>enlace</a> para restablecer tu contraseña.</p>`
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error(`Error enviando el correo: ${error.message}`);
    }
};

export const sendMailDeleteAccount = async (userName, userEmail) => {
    try {
        const mailOptionsGMail = {
            from: config.EMAIL,
            to: userEmail,
            subject: 'Cuenta eliminada de la aplicación por inactividad',
            html: `<h1>Hola ${userName} !</h1><p>Su cuenta ha sido eliminada de la aplicación por inactividad.</p>`
        }
        const response = await transporter.sendMail(mailOptionsGMail);
        logger.info('Email sent!');
        return response;
    } catch (error) {
        logger.error(`Error sending email: ${error.message}`);
    }
};

export const sendMailRegister = async (userName, userEmail) => {
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

export const sendMailProductDeleted = async (userName, userEmail, productTitle) => {
    try {
        const mailOptions = {
            from: config.EMAIL,
            to: userEmail,
            subject: 'Producto eliminado',
            html: `<h1>Hola ${userName},</h1>
                   <p>Tu producto <strong>${productTitle}</strong> ha sido eliminado de nuestra plataforma.</p>`
        };
        const response = await transporter.sendMail(mailOptions);
        logger.info('Email de eliminación de producto enviado con éxito');
        return response;
    } catch (error) {
        logger.error(`Error enviando el correo de eliminación de producto: ${error.message}`);
        throw new Error(`Error enviando el correo: ${error.message}`);
    }
};