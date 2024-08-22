import { createTransport } from 'nodemailer';
import config from '../config/config.js';

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
