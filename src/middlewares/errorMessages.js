export const errorMessagesMiddleware = (req, res, next) => {
    res.locals.errorMessage = req.session.messages ? req.session.messages.error : null;
    delete req.session.messages; // Limpia el mensaje después de usarlo
    next();
};