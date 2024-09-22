import { transporter } from '../services/mailingService.js';
import config from '../config/config.js';
import logger from '../config/logConfig.js';
import { sendResetPasswordEmail } from '../services/mailingService.js';
import UserService from '../services/userService.js';
const userService = new UserService();
import { v4 as uuidv4 } from 'uuid';
import { createHash } from '../utils/utils.js';
import bcrypt from 'bcrypt';

export const sendMailRegister = async (userName,userEmail) => {
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

export const renderResetPasswordView = (req, res) => {
    const { resetId } = req.params;
    const resetInfo = req.session.resetPassword;

    if (resetInfo && resetInfo.resetId === resetId && resetInfo.expirationTime > Date.now()) {
        res.render('resetPassword');
    } else {
        res.redirect('/mailtoresetpass'); // Redirigir si el enlace ha expirado o es inválido
    }
};

// Manejar el envío del correo para recuperación de contraseña
export const handleMailToResetPass = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userService.getByEmail(email);

        if (!user) {
            return res.render('mailToResetPass', { errorMessage: 'El email no está registrado.' });
        }

        const resetId = uuidv4();
        const expirationTime = Date.now() + 3600000; // 1 hora en milisegundos

        req.session.resetPassword = {
            resetId,
            expirationTime,
            email
        };

        await sendResetPasswordEmail(user.first_name, email, resetId);

        res.render('mailToResetPass', { successMessage: 'Correo enviado, revisa tu bandeja de entrada.' });
    } catch (error) {
        res.render('mailToResetPass', { errorMessage: 'Error al enviar el correo. Inténtalo de nuevo más tarde.' });
    }
};

// Procesar el formulario de recuperación de contraseña
export const handleResetPassword = async (req, res) => {
    const { password } = req.body;
    const { resetPassword } = req.session;

    if (!resetPassword || Date.now() > resetPassword.expirationTime) {
        return res.render('resetPassword', { errorMessage: 'El enlace ha expirado. Solicita un nuevo enlace.' });
    }

    try {
        const user = await userService.getByEmail(resetPassword.email);

        if (!user) {
            return res.render('resetPassword', { errorMessage: 'Usuario no encontrado.' });
        }

        const isSamePassword = await bcrypt.compare(password, user.password);

        if (isSamePassword) {
            return res.render('resetPassword', { errorMessage: 'La nueva contraseña no puede ser igual a la anterior.' });
        }

        // Encriptar la nueva contraseña
        const hashedPassword = createHash(password);

        // Actualizar la contraseña en la base de datos
        await userService.updatePassword(user._id, hashedPassword);

        // Limpiar la sesión después de un cambio exitoso
        req.session.resetPassword = null;

        res.render('resetPassword', { successMessage: 'Contraseña restablecida exitosamente.' });
    } catch (error) {
        console.error(`Error al restablecer la contraseña: ${error.message}`);
        res.render('resetPassword', { errorMessage: `Error al restablecer la contraseña: ${error.message}` });
    }
};

export const sendMailDeleteAccount = async (userName,userEmail) => {
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
}