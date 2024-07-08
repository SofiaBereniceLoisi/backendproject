import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

// ---------------------------------------------------------------------

import bcrypt from 'bcrypt';

//crear password encriptada. ej: createHash('1234')
/**
 * Funcion para hashear la contraseña a traves de bcrypt con método hashSync
 * @param {*} password tipo string
 * @returns password hasheada
 */
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

//comparar contraseñas para ver si entra en el login o no:
// antes de usar la funcion tengo que verificar que exista
/**
 * Funcion que compara password en string con password hasheada del usuario
 * @param {*} password tipo string
 * @param {*} user usuario existente en base de datos
 * @returns boolean
 */
export const isValidPassword = (password, user) => {
    return bcrypt.compareSync(password, user.password)
}

export const createResponse = (res, statusCode, data) => {
    // try {
        return res.status(statusCode).json(data);
    // } catch (error) {
    //     next(error)
    // }
}

