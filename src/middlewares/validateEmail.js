export const validateEmail = (req, res, next) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const { email } = req.body;
    
    if (emailRegex.test(email)) {
        next();
    } else {
        res.status(400).send('Email inválido');
    }
};


