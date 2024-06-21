export default class UserManager {
    constructor(model) {
        this.model = model;
    }

    async register(user) {
        try {
            const { email } = user;
            const existUser = await this.model.findOne({ email }); //trae el doc del user o null
            if (!existUser) {
                //si el user no existe lo crea
                return await this.model.create(user);
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(error)
        }
    };

    async getById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getByEmail(email) {
        try {
            return await this.model.findOne({ email });
        } catch (error) {
            throw new Error(error);
        }
    }
}