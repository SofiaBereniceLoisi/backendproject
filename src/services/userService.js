import { UserModel } from "../dao/mongoDB/models/usersModel.js";
import UserManager from "../dao/mongoDB/userManagerM.js";
import { createHash, isValidPassword } from "../utils.js";

const userManager = new UserManager(UserModel);

export const getUserById = async (id) => {
    try {
        return await userManager.getById(id);
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserByEmail = async (email) => {
    try {
        return await userManager.getByEmail(email);
    } catch (error) {
        throw new Error(error);
    }
};

export const login = async (user) => {
    try {
        const { email, password } = user;
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            req.session.first_name = "Admin";
            req.session.last_name = "";
            req.session.email = email;
            req.session.role = "admin";
            res.redirect('/api/products');
            //res.redirect('/profile');
        }
        const existUser = await getUserByEmail(email);
        if (!existUser) {
            return null
            //acá podría hacer que aparezca un modal/toastify diciendo que los datos ingresados son incorrectos.
        } else {
            if (isValidPassword(password, existUser)) {
                return existUser;
            } else {
                return null;
            }
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const register = async (user) => {
    try {
        const { email, password } = user;
        console.log(user)
        const existUser = await getUserByEmail(email);
        if (!existUser) {
            const newUser = await userManager.register({
                ...user,
                password: createHash(password),
            });
            return newUser;
        } else {
            return null;
        }
    }
    catch (error) {
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

// export const logout = (req, res) => {
//     req.session.destroy();
//     res.redirect("/login");
// };