import { UserModel } from "../dao/mongoDB/models/usersModel.js";
import UserManager from "../dao/mongoDB/userManagerM.js";
const userManager = new UserManager(UserModel);

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === "adminCoder@coder.com" && password === "adminCod3r123"){
            req.session.first_name = "Admin";
            req.session.last_name = "";
            req.session.email = email;
            req.session.role = "admin";
            return res.redirect('/profile');
        }
        const user = await userManager.login(email, password);
        if (!user) {
            res.status(401).json({ msg: "Credenciales incorrectas" });
            //acá podría hacer que aparezca un modal/toastify diciendo que los datos 
            //ingresados son incorrectos.
        } else {
            req.session.first_name = user.first_name;
            req.session.last_name = user.last_name;
            req.session.email = email;
            req.session.role = user.role;
            res.redirect('/profile');
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const register = async (req, res) => {
    try {
        console.log(req.body);
        //const { email, password } = req.body;
        const user = await userManager.register(req.body);
        if (!user) {
            return res.status(401).json({ msg: "El usuario ya existe!" });
        } else {
            return res.redirect("/login");
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const infoSession = (req, res) => {
    res.json({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies,
    });
};

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
};